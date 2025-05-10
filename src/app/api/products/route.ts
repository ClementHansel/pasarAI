import { db } from "@/lib/db/db"; // Your DB connection
import { NextRequest, NextResponse } from "next/server";

// Define custom types for Product and related filters
interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  isOnSale?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  createdAt: Date;
  market?: {
    marketType: "domestic" | "global";
  };
  categories?: Array<{ id: string; name: string }>;
  account?: {
    city?: string;
    province?: string;
    country?: string;
  };
  tags?: Array<{ name: string }>;
  labels?: Array<{ name: string }>;
}

type ProductWhereInput = {
  OR?: Array<{
    name?: { contains: string; mode: "insensitive" };
    description?: { contains: string; mode: "insensitive" };
    tags?: { some: { name: { contains: string; mode: "insensitive" } } };
  }>;
  name?: { contains: string; mode: "insensitive" };
  description?: { contains: string; mode: "insensitive" };
  tags?: { some: { name: { contains: string; mode: "insensitive" } } };
  market?: { marketType: "domestic" | "global" };
  categories?: { some: { id?: string; name?: string } };
  account?: {
    is: {
      city?: string;
      province?: string;
      country?: string;
    };
  };
};

type ProductOrderByInput = {
  price?: "asc" | "desc";
  isOnSale?: "desc";
  isBestSeller?: "desc";
  createdAt?: "desc";
};

// Update the API logic to use these custom types
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const category = searchParams.get("category");
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

    const filters: ProductWhereInput = {
      ...(category && {
        categories: {
          some: {
            name: category,
          },
        },
      }),
      ...(marketType && {
        market: {
          marketType: marketType as "domestic" | "global",
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

    const orderBy: ProductOrderByInput[] = [];
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
      }) as Promise<Product[]>,
      db.product.count({ where: filters }),
    ]);

    const productsWithImageUrls = products.map((p: Product) => ({
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
