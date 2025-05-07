// src/app/api/searchbox/route.ts
import { db } from "@/lib/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.toLowerCase().trim();

    if (!query) {
      return NextResponse.json({ results: [] });
    }

    // Search in products, brands, and categories
    const products = await db.product.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
        categories: {
          select: {
            name: true,
          },
        },
        brand: {
          select: {
            name: true,
          },
        },
      },
      take: 10,
    });

    return NextResponse.json({ results: products });
  } catch (error) {
    console.error("[SEARCH_API_ERROR]", error);
    return NextResponse.json(
      { error: "Something went wrong while searching." },
      { status: 500 }
    );
  }
}
