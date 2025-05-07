import { db } from "@/lib/db/db";
import { NextRequest, NextResponse } from "next/server";

// GET: /api/reviews/seller?sellerId=xxx
export async function GET(req: NextRequest) {
  const sellerId = req.nextUrl.searchParams.get("sellerId");

  if (!sellerId) {
    return NextResponse.json(
      { error: "Seller ID is required" },
      { status: 400 }
    );
  }

  try {
    const reviews = await db.review.findMany({
      where: { sellerId },
      include: {
        account: {
          select: { id: true, name: true, profileImage: true }, // reviewer info
        },
        product: {
          select: { id: true, name: true, image: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    if (reviews.length === 0) {
      return NextResponse.json(
        { message: "No reviews found for this seller." },
        { status: 404 }
      );
    }

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("GET /api/reviews/seller", error);
    return NextResponse.json(
      { error: "Failed to fetch seller reviews" },
      { status: 500 }
    );
  }
}

// POST: /api/reviews/seller
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { sellerId, userId, rating, comment, productId } = body;

  if (!sellerId || !userId || rating === undefined || !productId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Start a transaction to ensure ACID properties
  const transaction = await db.$transaction(async (prisma) => {
    // Check if the product exists and the seller exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("Product not found.");
    }

    // Create the new review
    const newReview = await prisma.review.create({
      data: {
        accountId: userId, // buyer who wrote the review
        sellerId, // seller being reviewed
        productId,
        rating,
        comment,
      },
    });

    return newReview;
  });

  try {
    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error("POST /api/reviews/seller", error);
    return NextResponse.json(
      { error: "Failed to create seller review" },
      { status: 500 }
    );
  }
}
