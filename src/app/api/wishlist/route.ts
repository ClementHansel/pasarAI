import { db } from "@/lib/db/db";
import { NextRequest, NextResponse } from "next/server";

// GET: List wishlist with optional filters and pagination
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const accountId = searchParams.get("accountId");
  const productId = searchParams.get("productId");
  const marketId = searchParams.get("marketId");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  if (!accountId) {
    return NextResponse.json({ error: "Missing accountId" }, { status: 400 });
  }

  const where = {
    accountId,
    ...(productId && { productId }),
    ...(marketId && { marketId }),
  };

  try {
    const [total, items] = await db.$transaction([
      db.wishlist.count({ where }),
      db.wishlist.findMany({
        where,
        include: { product: true, market: true },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return NextResponse.json({ total, page, limit, items });
  } catch (error) {
    console.error("Wishlist GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST: Toggle wishlist (add/remove if exists)
export async function POST(req: NextRequest) {
  // Parse & validate
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { accountId, productId, marketId } = body as Partial<{
    accountId: string;
    productId: string;
    marketId: string;
  }>;

  if (
    typeof accountId !== "string" ||
    typeof productId !== "string" ||
    typeof marketId !== "string"
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const { added, removed } = await db.$transaction(async (tx) => {
      const existing = await tx.wishlist.findFirst({
        where: { accountId, productId, marketId },
      });

      if (existing) {
        await tx.wishlist.delete({ where: { id: existing.id } });
        return { removed: true, added: null };
      } else {
        const addedItem = await tx.wishlist.create({
          data: { accountId, productId, marketId },
        });
        return { removed: false, added: addedItem };
      }
    });

    if (removed) {
      return NextResponse.json({
        message: "Removed from wishlist",
        removed: true,
      });
    }
    return NextResponse.json({
      message: "Added to wishlist",
      removed: false,
      added,
    });
  } catch (error) {
    console.error("Wishlist POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE: Remove wishlist item by ID
export async function DELETE(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { id } = body as { id?: string };

  if (typeof id !== "string") {
    return NextResponse.json({ error: "Missing wishlist ID" }, { status: 400 });
  }

  try {
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
