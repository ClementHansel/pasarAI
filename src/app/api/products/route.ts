import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod"; // For input validation

const prisma = new PrismaClient();

// Zod schema for product creation and update validation
const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters long"),
  description: z.string().optional(),
  price: z
    .number()
    .positive("Price must be a positive number")
    .min(0.01, "Price must be greater than zero"),
  image: z.string().url().optional(),
  stock: z.number().int().positive().optional(),
  soldCount: z.number().int().optional(),
  unit: z.string().optional(),
  tags: z.array(z.string()).optional(), // Array of strings
  categoryId: z.string().optional(),
  ecoCertifications: z.string().optional(),
  origin: z.string().optional(),
  sku: z.string().optional(),
  isActive: z.boolean().optional(),
  sellerId: z.string(),
  marketId: z.string(),
});

// Get all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true, // Include category information
        seller: true, // Include seller information
        reviews: true, // Include reviews
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching products" },
      { status: 500 }
    );
  }
}

// Create a new product
export async function POST(req: Request) {
  try {
    // Parse and validate request body
    const body = await req.json();
    const parsedBody = productSchema.safeParse(body);

    if (!parsedBody.success) {
      const errorMessages = parsedBody.error.errors.map((err) => err.message);
      return NextResponse.json(
        { error: `Validation failed: ${errorMessages.join(", ")}` },
        { status: 400 }
      );
    }

    // Destructure validated data
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
    } = parsedBody.data;

    // Check if the product already exists (based on sku)
    const existingProduct = await prisma.product.findFirst({
      where: { sku },
    });

    if (existingProduct) {
      return NextResponse.json(
        { error: "Product with this SKU already exists" },
        { status: 409 }
      );
    }

    // Create new product
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
        tags: {
          create: tags?.map((tag: string) => ({ name: tag })), // Ensure tags are created with explicit type
        },
      },
    });

    return NextResponse.json(
      { message: "Product created successfully", product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "An internal error occurred while creating the product" },
      { status: 500 }
    );
  }
}

// Update an existing product
export async function PUT(req: Request) {
  try {
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
    } = await req.json();

    // Validate required fields
    if (!id || !name || !price || !sku || !sellerId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if the product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Update the product
    const updatedProduct = await prisma.product.update({
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
          set: tags?.map((tag: string) => ({ name: tag })), // Replace old tags with new ones, explicitly typing
        },
      },
    });

    return NextResponse.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "An internal error occurred while updating the product" },
      { status: 500 }
    );
  }
}

// Delete an existing product
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // Check if the product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Delete the product
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "An internal error occurred while deleting the product" },
      { status: 500 }
    );
  }
}
