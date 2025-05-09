import { db } from "@/lib/db/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const marketType = searchParams.get("marketType");
    const city = searchParams.get("city");
    const province = searchParams.get("province");
    const country = searchParams.get("country");
    const categoryId = searchParams.get("categoryId");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const sortByPrice = searchParams.get("sortByPrice");
    const sortByTags = searchParams.get("sortByTags");
    const search = searchParams.get("search");

    const validMarketTypes = ["domestic", "global"];
    if (marketType && !validMarketTypes.includes(marketType)) {
      return NextResponse.json(
        {
          error: `Invalid marketType. Valid values: ${validMarketTypes.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    const filters: Prisma.ProductWhereInput = {
      ...(marketType && {
        market: {
          marketType,
        },
      }),
      ...(categoryId && {
        categories: {
          some: {
            id: categoryId,
          },
        },
      }),
      ...(city || province || country
        ? {
            account: {
              is: {
                ...(city ? { city } : {}),
                ...(province ? { province } : {}),
                ...(country ? { country } : {}),
              },
            },
          }
        : {}),
    };

    if (search) {
      filters.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { tags: { some: { name: { contains: search, mode: "insensitive" } } } },
      ];
    }

    const orderBy: Prisma.ProductOrderByWithRelationInput[] = [];
    if (sortByPrice === "priceLow") orderBy.push({ price: "asc" });
    if (sortByPrice === "priceHigh") orderBy.push({ price: "desc" });

    if (sortByTags === "onSale") orderBy.push({ isOnSale: "desc" });
    if (sortByTags === "bestSeller") orderBy.push({ isBestSeller: "desc" });
    if (sortByTags === "newArrival") orderBy.push({ createdAt: "desc" });

    const skip = (page - 1) * limit;

    const [products, totalProducts] = await Promise.all([
      db.product.findMany({
        where: filters,
        orderBy: orderBy.length > 0 ? orderBy : undefined,
        skip,
        take: limit,
        include: {
          categories: true,
          account: true,
          reviews: true,
          tags: true,
          labels: true,
          market: true,
        },
      }),
      db.product.count({ where: filters }),
    ]);

    const productsWithImageUrls = products.map((p) => ({
      ...p,
      imageUrls: p.image ? [p.image] : [],
    }));

    return NextResponse.json({
      products: productsWithImageUrls,
      pagination: {
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (error) {
    console.error("[PUBLIC_PRODUCTS_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
