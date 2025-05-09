// src/app/api/products/[id]/route.ts
import { db } from "@/lib/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Fetch the product by its ID
    const product = await db.product.findUnique({
      where: { id: id },
      include: {
        categories: true,
        account: true,
        reviews: true,
        tags: true,
        labels: true,
        market: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const productWithImageUrls = {
      ...product,
      imageUrls: product.image ? [product.image] : [],
    };

    return NextResponse.json(productWithImageUrls);
  } catch (error) {
    console.error("[PRODUCT_DETAIL_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
