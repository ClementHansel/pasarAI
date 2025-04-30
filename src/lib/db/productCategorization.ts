// src/lib/productCategorization.ts

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Function to automatically categorize a product based on its creation time
export const categorizeProduct = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { categories: true },
  });

  // If the product doesn't exist, return early
  if (!product) return null;

  const createdAt = new Date(product.createdAt);
  const isNewArrival =
    new Date().getTime() - createdAt.getTime() < 24 * 60 * 60 * 1000;

  // Automatically categorize as "New Arrival" if the product is created within the last 24 hours
  if (isNewArrival) {
    await prisma.product.update({
      where: { id: productId },
      data: {
        tags: {
          connectOrCreate: {
            where: { name: "New Arrival" },
            create: { name: "New Arrival" },
          },
        },
      },
    });
  }

  // Apply logic for "Best Seller" based on sales count (example: top 5 products)
  const bestSellers = await prisma.product.findMany({
    where: { soldCount: { gte: 100 } }, // example: products with more than 100 sold
    take: 5, // limit to top 5
  });
  if (bestSellers.some((p) => p.id === productId)) {
    await prisma.product.update({
      where: { id: productId },
      data: {
        tags: {
          connectOrCreate: {
            where: { name: "Best Seller" },
            create: { name: "Best Seller" },
          },
        },
      },
    });
  }

  // Apply "On Sale" tag if there's a discount applied to the product
  if (product.originalPrice !== null && product.originalPrice > product.price) {
    await prisma.product.update({
      where: { id: productId },
      data: {
        tags: {
          connectOrCreate: {
            where: { name: "On Sale" },
            create: { name: "On Sale" },
          },
        },
      },
    });
  }

  // Return the category id of the product
  return product.categories.map((c) => c.id);
};
