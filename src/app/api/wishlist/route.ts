import { db } from "@/lib/db/db";
import { NextResponse } from "next/server";

// GET: List wishlist with optional filters and pagination
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const accountId = searchParams.get("accountId");
    const productId = searchParams.get("productId");
    const marketId = searchParams.get("marketId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    if (!accountId) {
      return NextResponse.json({ error: "Missing accountId" }, { status: 400 });
    }

    const where = {
      accountId,
      ...(productId && { productId }),
      ...(marketId && { marketId }),
    };

    const [total, items] = await Promise.all([
      db.wishlist.count({ where }),
      db.wishlist.findMany({
        where,
        include: {
          product: true,
          market: true,
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return NextResponse.json({
      total,
      page,
      limit,
      items,
    });
  } catch (error) {
    console.error("Wishlist GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST: Toggle wishlist (add/remove if exists)
export async function POST(req: Request) {
  try {
    const { accountId, productId, marketId } = await req.json();

    if (!accountId || !productId || !marketId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existing = await db.wishlist.findFirst({
      where: { accountId, productId, marketId },
    });

    if (existing) {
      await db.wishlist.delete({ where: { id: existing.id } });
      return NextResponse.json({
        message: "Removed from wishlist",
        removed: true,
      });
    } else {
      const added = await db.wishlist.create({
        data: { accountId, productId, marketId },
      });
      return NextResponse.json({
        message: "Added to wishlist",
        added,
        removed: false,
      });
    }
  } catch (error) {
    console.error("Wishlist POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE: Remove wishlist item by ID
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "Missing wishlist ID" },
        { status: 400 }
      );
    }

    await db.wishlist.delete({ where: { id } });
    return NextResponse.json({ message: "Wishlist item deleted" });
  } catch (error) {
    console.error("Wishlist DELETE error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
