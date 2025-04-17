import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const productSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  price: z.number().positive().min(0.01),
  image: z.string().url().optional(),
  stock: z.number().int().positive().optional(),
  soldCount: z.number().int().optional(),
  unit: z.string().optional(),
  tags: z.array(z.string()).optional(),
  categoryId: z.string().optional(),
  ecoCertifications: z.string().optional(),
  origin: z.string().optional(),
  sku: z.string().optional(),
  isActive: z.boolean().optional(),
  sellerId: z.string(),
  marketId: z.string(),
});

function formatTagsForCreateOrUpdate(tags?: string[]) {
  if (!tags || tags.length === 0) return undefined;

  return {
    connectOrCreate: tags.map((tagName) => ({
      where: { name: tagName },
      create: { name: tagName },
    })),
  };
}

// GET: Fetch all products
export async function GET() {
  try {
    console.log("Fetching products from Prisma...");
    const products = await prisma.product.findMany({
      include: {
        category: true,
        seller: true,
        reviews: true,
        tags: true,
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST: Create product
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = productSchema.safeParse(body);

    if (!parsed.success) {
      const errorMessages = parsed.error.errors
        .map((e) => e.message)
        .join(", ");
      return NextResponse.json(
        { error: `Validation failed: ${errorMessages}` },
        { status: 400 }
      );
    }

    const {
      name,
      description,
      price,
      image,
      stock,
      soldCount,
      unit,
      tags,
      categoryId,
      ecoCertifications,
      origin,
      sku,
      isActive,
      sellerId,
      marketId,
    } = parsed.data;

    if (sku) {
      const existing = await prisma.product.findFirst({ where: { sku } });
      if (existing) {
        return NextResponse.json(
          { error: "Product with this SKU already exists" },
          { status: 409 }
        );
      }
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        image,
        stock,
        soldCount,
        unit,
        categoryId,
        ecoCertifications,
        origin,
        sku,
        isActive,
        sellerId,
        marketId,
        tags: formatTagsForCreateOrUpdate(tags),
      },
      include: { tags: true },
    });

    return NextResponse.json(
      { message: "Product created", product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

// PUT: Update product
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      name,
      description,
      price,
      image,
      stock,
      soldCount,
      unit,
      tags,
      categoryId,
      ecoCertifications,
      origin,
      sku,
      isActive,
      sellerId,
    } = body;

    if (!id || !name || !price || !sku || !sellerId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Disconnect all current tags and replace them
    const updated = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        image,
        stock,
        soldCount,
        unit,
        categoryId,
        ecoCertifications,
        origin,
        sku,
        isActive,
        sellerId,
        tags: {
          set: [], // Remove old tags first
          ...formatTagsForCreateOrUpdate(tags),
        },
      },
      include: { tags: true },
    });

    return NextResponse.json({ message: "Product updated", product: updated });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE: Remove product
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
