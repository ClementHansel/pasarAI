import { NextRequest, NextResponse } from "next/server";
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
import { Role } from "@prisma/client";

// Helper function to handle errors and generate responses
export function handleApiError(err: unknown, defaultMessage: string) {
  let errorMessage = defaultMessage;

  if (err instanceof Error) {
    errorMessage = `${defaultMessage}: ${err.message}`;
    console.error("Stack Trace:", err.stack);
  } else if (typeof err === "string") {
    errorMessage = `${defaultMessage}: ${err}`;
    console.error("Error String:", err);
  } else {
    console.error("Unknown error type:", err);
  }

  return NextResponse.json(
    {
      success: false,
      message: errorMessage,
    },
    { status: 500 }
  );
}

// Group markets into regions, subregions, and cities
function groupMarkets(raws: MarketWithRelations[]): MarketRegion[] {
  const regions = new Map<string, MarketRegion>();

  raws.forEach((market) => {
    const regionKey = market.region?.name ?? "Unknown";
    if (!regions.has(regionKey)) {
      regions.set(regionKey, {
        id: market.region?.id ?? regionKey,
        name: regionKey,
        region: regionKey,
        subRegions: [],
        sellers: [],
      });
    }
    const region = regions.get(regionKey)!;

    const subRegionKey = market.subRegion?.name ?? "Unknown";
    let subRegion = region.subRegions.find((sub) => sub.name === subRegionKey);
    if (!subRegion) {
      subRegion = {
        id: market.subRegion?.id ?? subRegionKey,
        name: subRegionKey,
        cities: [],
        sellers: [],
      };
      region.subRegions.push(subRegion);
    }

    const cityKey = market.city?.name ?? "Unknown";
    let city = subRegion.cities.find((c) => c.name === cityKey);
    if (!city) {
      city = { id: market.city?.id ?? cityKey, name: cityKey, sellers: [] };
      subRegion.cities.push(city);
    }

    market.sellers.forEach((acct) => {
      const seller: Seller = {
        id: acct.id,
        name: acct.name,
        role: acct.role,
        currency: acct.currency ? (acct.currency as Currency) : Currency.IDR,
        rating: market.rating ?? undefined,
        location: market.location,
        productCount: market.productCount ?? undefined,
        joinDate: market.joinDate ?? undefined,
        verified: market.verified ?? undefined,
      };
      city.sellers.push(seller);
      subRegion.sellers.push(seller);
      region.sellers.push(seller);
    });
  });

  return Array.from(regions.values());
}

// GET: fetch and group markets
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = (searchParams.get("type") as string) || "domestic";

    // 1. Fetch raw flat markets
    const rawMarkets = await db.market.findMany({
      where: { marketType: type },
      orderBy: { region: { name: "asc" } },
      include: {
        currency: true,
        region: true,
        subRegion: true,
        city: true,
        sellers: {
          where: { role: Role.SELLER },
          include: { currency: true },
        },
      },
    });

    // 2. Clean and fix seller currency
    const markets = rawMarkets.map((market) => ({
      ...market,
      sellers: market.sellers.map((seller) => ({
        ...seller,
        currency: seller.currency?.name ?? null,
      })),
    })) as MarketWithRelations[];

    // 3. Group markets into region -> subRegion -> city -> sellers
    const groupedMarkets = groupMarkets(markets);

    // 4. Return grouped result
    return NextResponse.json(
      { success: true, data: groupedMarkets },
      { status: 200 }
    );
  } catch (err) {
    return handleApiError(err, "[GET] /api/markets");
  }
}

// POST: create a new market
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = MarketCreateSchema.parse(body);

    const createdMarket = await db.market.create({
      data: {
        ...validated,
        regionId: validated.regionId ? Number(validated.regionId) : undefined,
        subRegionId: validated.subRegionId
          ? Number(validated.subRegionId)
          : undefined,
        cityId: validated.cityId ? Number(validated.cityId) : undefined,
      },
    });

    return NextResponse.json(
      { success: true, data: createdMarket },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Validation error", issues: err.issues },
        { status: 400 }
      );
    }
    return handleApiError(err, "[POST] /api/markets");
  }
}

// PUT: update an existing market
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = MarketUpdateSchema.parse(body);

    const updatedMarket = await db.market.update({
      where: { id: validated.id },
      data: {
        ...validated,
        regionId: validated.regionId ? Number(validated.regionId) : undefined,
        subRegionId: validated.subRegionId
          ? Number(validated.subRegionId)
          : undefined,
        cityId: validated.cityId ? Number(validated.cityId) : undefined,
      },
    });

    return NextResponse.json(
      { success: true, data: updatedMarket },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Validation error", issues: err.issues },
        { status: 400 }
      );
    }
    return handleApiError(err, "[PUT] /api/markets");
  }
}

// DELETE: delete a market
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = MarketDeleteSchema.parse(body);
    const deletedMarket = await db.market.delete({
      where: { id: validated.id },
    });

    return NextResponse.json(
      { success: true, data: deletedMarket },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Validation error", issues: err.issues },
        { status: 400 }
      );
    }
    return handleApiError(err, "[DELETE] /api/markets");
  }
}
