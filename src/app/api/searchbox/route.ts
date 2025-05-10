// src/app/api/searchbox/route.ts
import { db } from "@/lib/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.toLowerCase().trim();
    const type = searchParams.get("type") as "domestic" | "global" | undefined;

    if (!query) {
      return NextResponse.json({ results: [] });
    }

    // Search in markets based on market type
    const markets = await db.market.findMany({
      where: {
        ...(type && { marketType: type }),
        OR: [
          {
            // Search by market name
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            // Search by region name
            region: {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
          {
            // Search by subregion name
            subRegion: {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
          {
            // Search by city name
            city: {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        marketType: true,
        region: {
          select: {
            name: true,
          },
        },
        subRegion: {
          select: {
            name: true,
          },
        },
        city: {
          select: {
            name: true,
          },
        },
      },
      take: 10,
    });

    const results = markets.map((market) => ({
      id: market.id,
      name: market.name,
      location: [market.region?.name, market.subRegion?.name, market.city?.name]
        .filter(Boolean)
        .join(", "),
      marketType: market.marketType,
    }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error("[SEARCH_API_ERROR]", error);
    return NextResponse.json(
      { error: "Something went wrong while searching." },
      { status: 500 }
    );
  }
}
