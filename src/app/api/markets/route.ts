// src/app/api/markets/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Role as PrismaRole } from "@prisma/client";
import { z } from "zod";
import {
  MarketCreateSchema,
  MarketUpdateSchema,
  MarketDeleteSchema,
} from "@/lib/validation/marketSchemas";
import {
  Currency,
  MarketRegion,
  MarketWithRelations,
  Seller,
} from "@/types/market";
import { db } from "@/lib/db/db";

// (1) groupMarkets now pulls seller fields off the account + market record
function groupMarkets(raws: MarketWithRelations[]): MarketRegion[] {
  const regions = new Map<string, MarketRegion>();

  raws.forEach((m) => {
    const regionKey = m.region?.name ?? "Unknown";
    if (!regions.has(regionKey)) {
      regions.set(regionKey, {
        id: m.region?.id ?? regionKey,
        name: regionKey,
        region: regionKey,
        subregions: [],
        sellers: [],
      });
    }
    const region = regions.get(regionKey)!;

    const subRegionKey = m.subregion?.name ?? "Unknown";
    let sub = region.subregions.find((s) => s.name === subRegionKey);
    if (!sub) {
      sub = {
        id: m.subregion?.id ?? subRegionKey,
        name: subRegionKey,
        cities: [],
        sellers: [],
      };
      region.subregions.push(sub);
    }

    const cityKey = m.city?.name ?? "Unknown";
    let city = sub.cities.find((c) => c.name === cityKey);
    if (!city) {
      city = { id: m.city?.id ?? cityKey, name: cityKey, sellers: [] };
      sub.cities.push(city);
    }

    // for each Account in m.sellers, build our Seller object
    m.sellers.forEach((acct) => {
      const seller: Seller = {
        id: acct.id,
        name: acct.name,
        role: acct.role,
        currency: (acct.currency?.name as Currency) ?? Currency.IDR,
        rating: m.rating ?? undefined,
        location: m.location,
        productCount: m.productCount ?? undefined,
        joinDate: m.joinDate ?? undefined,
        verified: m.verified ?? undefined,
      };
      city.sellers.push(seller);
      sub!.sellers.push(seller);
      region.sellers.push(seller);
    });
  });

  return Array.from(regions.values());
}

// GET: fetch + group
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = (searchParams.get("type") as string) || "domestic";

    const raws = (await db.market.findMany({
      where: { marketType: type },
      orderBy: { region: { name: "asc" } },
      include: {
        currency: true,
        region: true,
        subregion: true,
        city: true,
        sellers: {
          where: { role: PrismaRole.SELLER },
          include: { currency: true },
        },
      },
    })) as MarketWithRelations[];

    const data = groupMarkets(raws);
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    console.error("[GET] /api/markets", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch markets." },
      { status: 500 }
    );
  }
}

// POST: create
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = MarketCreateSchema.parse(body);
    const created = await db.market.create({ data: validated });
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (err) {
    console.error("[POST] /api/markets", err);
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Validation error", issues: err.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to create market." },
      { status: 500 }
    );
  }
}

// PUT: update
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = MarketUpdateSchema.parse(body);
    const updated = await db.market.update({
      where: { id: validated.id },
      data: validated,
    });
    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (err) {
    console.error("[PUT] /api/markets", err);
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Validation error", issues: err.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to update market." },
      { status: 500 }
    );
  }
}

// DELETE: remove
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = MarketDeleteSchema.parse(body);
    const deleted = await db.market.delete({ where: { id: validated.id } });
    return NextResponse.json({ success: true, data: deleted }, { status: 200 });
  } catch (err) {
    console.error("[DELETE] /api/markets", err);
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Validation error", issues: err.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to delete market." },
      { status: 500 }
    );
  }
}
