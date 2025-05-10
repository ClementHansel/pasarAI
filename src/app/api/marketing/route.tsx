import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { z } from "zod";

const ProductUpdateSchema = z.object({
  id: z.string().uuid(),
  isFeatured: z.boolean().optional(),
  isNewArrival: z.boolean().optional(),
  isBestSeller: z.boolean().optional(),
  isOnSale: z.boolean().optional(),
  duration: z.number().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const accountId = searchParams.get("accountId");

    if (!accountId) {
      return NextResponse.json({ error: "Missing accountId" }, { status: 400 });
    }

    const products = await db.product.findMany({
      where: {
        accountId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("[MARKETING_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export const PUT = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const accountId = searchParams.get("accountId");
    if (!accountId) {
      return NextResponse.json({ error: "Missing accountId" }, { status: 400 });
    }

    const body = await req.json();
    const parsed = ProductUpdateSchema.parse(body);

    const existing = await db.product.findUnique({
      where: { id: parsed.id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (existing.accountId !== accountId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updated = await db.product.update({
      where: { id: parsed.id },
      data: {
        isFeatured: parsed.isFeatured,
        isNewArrival: parsed.isNewArrival,
        isBestSeller: parsed.isBestSeller,
        isOnSale: parsed.isOnSale,
        duration: parsed.duration,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/marketing error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
