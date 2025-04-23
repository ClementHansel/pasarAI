import { db } from "@/lib/db";
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
          select: { id: true, name: true, image: true }, // optional: show product reviewed
        },
      },
      orderBy: { createdAt: "desc" },
    });

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

  try {
    const newReview = await db.review.create({
      data: {
        accountId: userId, // buyer who wrote the review
        sellerId, // seller being reviewed
        productId,
        rating,
        comment,
      },
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error("POST /api/reviews/seller", error);
    return NextResponse.json(
      { error: "Failed to create seller review" },
      { status: 500 }
    );
  }
}
