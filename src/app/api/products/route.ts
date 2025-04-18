import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { categorizeProduct } from "@/lib/productCategorization";
import { z } from "zod";
import { db } from "@/lib/db";

const prisma = new PrismaClient();

// Move this helper function to the top before it's used
function isNewArrival(createdAt: Date): boolean {
  const oneDay = 24 * 60 * 60 * 1000;
  return Date.now() - createdAt.getTime() <= oneDay;
}

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
  label: z.string(),
  createdAt: z.string().optional(),
  discount: z.number().optional(),
  featured: z.boolean().optional(),
  isNewArrival: z.boolean().optional(),
  isBestSeller: z.boolean().optional(),
  isOnSale: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
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
    const products = await db.product.findMany({
      include: {
        category: true,
        seller: true,
        reviews: true,
        tags: true,
        labels: true,
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
      label,
      createdAt,
      discount,
      featured,
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

    // Ensure category
    let finalCategoryId = categoryId;
    if (!finalCategoryId) {
      const uncategorized = await prisma.category.findFirst({
        where: { name: "Uncategorized" },
      });
      if (uncategorized) {
        finalCategoryId = uncategorized.id;
      } else {
        const created = await prisma.category.create({
          data: { name: "Uncategorized" },
        });
        finalCategoryId = created.id;
      }
    }

    // Ensure label exists or create it
    const labelObj = await prisma.label.upsert({
      where: { name: label },
      update: {},
      create: { name: label },
    });

    // Auto-labels
    const autoLabels: string[] = [];
    if (createdAt && isNewArrival(new Date(createdAt)))
      autoLabels.push("New Arrival");
    if (discount && discount > 0) autoLabels.push("On Sale");
    if (featured) autoLabels.push("Featured");

    const autoLabelConnections = await Promise.all(
      autoLabels.map(async (labelName) => {
        return prisma.label.upsert({
          where: { name: labelName },
          update: {},
          create: { name: labelName },
        });
      })
    );

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        image,
        stock,
        soldCount,
        unit,
        categoryId: finalCategoryId,
        ecoCertifications,
        origin,
        sku,
        isActive,
        sellerId,
        marketId,
        tags: formatTagsForCreateOrUpdate(tags),
        labels: {
          connect: [
            { id: labelObj.id },
            ...autoLabelConnections.map((l) => ({ id: l.id })),
          ],
        },
      },
      include: { tags: true, category: true, labels: true },
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
      categoryLabel,
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

    if (categoryId && categoryLabel) {
      await prisma.category.update({
        where: { id: categoryId },
        data: { label: categoryLabel },
      });
    }

    let finalCategoryId = categoryId;
    if (!finalCategoryId) {
      const newCat = await categorizeProduct(name + " " + (description || ""));
      finalCategoryId = newCat || existing.categoryId;
    }

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
        categoryId: finalCategoryId,
        ecoCertifications,
        origin,
        sku,
        isActive,
        sellerId,
        tags: {
          set: [],
          ...formatTagsForCreateOrUpdate(tags),
        },
      },
      include: { tags: true, category: true },
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
