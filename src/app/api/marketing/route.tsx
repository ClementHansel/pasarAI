import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { Product } from "@prisma/client";
import { z } from "zod";
import { withSellerAuth } from "@/lib/middleware";

// Define Zod schema to validate incoming data for product updates
const ProductUpdateSchema = z.object({
  id: z.string().uuid(),
  isFeatured: z.boolean().optional(),
  isNewArrival: z.boolean().optional(),
  isBestSeller: z.boolean().optional(),
  isOnSale: z.boolean().optional(),
  duration: z.number().optional(),
});

export const GET = withSellerAuth(async (req) => {
  try {
    // Ensure 'req.user' is populated with the seller's info
    const sellerId = req.user?.id;

    if (!sellerId) {
      return NextResponse.json(
        { error: "Seller not authenticated" },
        { status: 401 }
      );
    }

    // Fetch products that belong to this seller (you can modify this based on your schema)
    const products: Product[] = await db.product.findMany({
      where: {
        accountId: sellerId, // Use accountId to filter by seller
      },
      orderBy: {
        createdAt: "desc", // Sort by creation date or any other field
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching seller's products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
});

export const PUT = withSellerAuth(async (req) => {
  const { id, isFeatured, isNewArrival, isBestSeller, isOnSale, duration } =
    await req.json();

  // Parse and validate the incoming request body
  let parsedData;

  try {
    parsedData = ProductUpdateSchema.parse({
      id,
      isFeatured,
      isNewArrival,
      isBestSeller,
      isOnSale,
      duration,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to parse request data" },
      { status: 400 }
    );
  }

  try {
    // Ensure the user is authenticated as a SELLER and has the right to edit this product
    const sellerId = req.user?.id;

    if (!sellerId) {
      return NextResponse.json(
        { error: "Seller not authenticated" },
        { status: 401 }
      );
    }

    // Check if the product belongs to the authenticated seller
    const product = await db.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.accountId !== sellerId) {
      // Check against accountId instead of sellerId
      return NextResponse.json(
        { error: "You do not have permission to update this product" },
        { status: 403 }
      );
    }

    // Update the product with the new values
    const updatedProduct = await db.product.update({
      where: { id },
      data: {
        isFeatured: parsedData.isFeatured ?? undefined,
        isNewArrival: parsedData.isNewArrival ?? undefined,
        isBestSeller: parsedData.isBestSeller ?? undefined,
        isOnSale: parsedData.isOnSale ?? undefined,
        duration: parsedData.duration ?? undefined,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product promotion" },
      { status: 500 }
    );
  }
});
