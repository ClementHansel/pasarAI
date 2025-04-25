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

    if (!reviews.length) {
      return NextResponse.json(
        { message: "No reviews found." },
        { status: 404 }
      );
    }

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
  const { productId, accountId, rating, comment } = await req.json();

  if (!productId || !accountId || typeof rating !== "number") {
    return NextResponse.json(
      { error: "Product ID, Account ID, and rating are required." },
      { status: 400 }
    );
  }

  // Start a transaction to ensure ACID properties
  const transaction = await db.$transaction(async (prisma) => {
    // Step 1: Check if the product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { accountId: true },
    });

    if (!product) {
      throw new Error("Product not found.");
    }

    // Fetch the sellerId
    const sellerId = product.accountId;

    // Create the new review
    const newReview = await prisma.review.create({
      data: {
        productId,
        accountId,
        sellerId,
        rating,
        comment: comment?.trim() || null,
      },
    });

    return newReview;
  });

  try {
    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error("[POST /api/reviews/product] Error:", error);
    return NextResponse.json(
      { error: "Failed to create product review." },
      { status: 500 }
    );
  }
}
