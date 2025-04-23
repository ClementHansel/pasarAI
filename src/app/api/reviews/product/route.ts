import { db } from "@/lib/db/db";
import { NextRequest, NextResponse } from "next/server";

// GET: /api/reviews/product?productId=xxx
export async function GET(req: NextRequest) {
  const productId = req.nextUrl.searchParams.get("productId");

  if (!productId) {
    return NextResponse.json(
      { error: "Product ID is required." },
      { status: 400 }
    );
  }

  try {
    const reviews = await db.review.findMany({
      where: { productId },
      include: {
        account: {
          select: { id: true, name: true, profileImage: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("[GET /api/reviews/product] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product reviews." },
      { status: 500 }
    );
  }
}

// POST: /api/reviews/product
export async function POST(req: NextRequest) {
  try {
    const { productId, accountId, rating, comment } = await req.json();

    if (!productId || !accountId || typeof rating !== "number") {
      return NextResponse.json(
        { error: "Product ID, Account ID, and rating are required." },
        { status: 400 }
      );
    }

    // Get the sellerId based on the productId
    const product = await db.product.findUnique({
      where: { id: productId },
      select: { accountId: true },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 }
      );
    }

    const sellerId = product.accountId;

    const newReview = await db.review.create({
      data: {
        productId,
        accountId,
        sellerId,
        rating,
        comment: comment?.trim() || null,
      },
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error("[POST /api/reviews/product] Error:", error);
    return NextResponse.json(
      { error: "Failed to create product review." },
      { status: 500 }
    );
  }
}
