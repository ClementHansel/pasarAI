// src/lib/api/marketing.ts
import { Product } from "@/types/product";

interface PromotionData {
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isOnSale?: boolean;
  duration?: number;
}

// Fetch products from the API
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch("/api/marketing/products");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

// Update product promotion
export const updateProductPromotion = async (
  productId: string,
  promotionData: PromotionData
): Promise<Product> => {
  const response = await fetch(`/api/marketing/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(promotionData),
  });

  if (!response.ok) {
    throw new Error("Failed to update product promotion");
  }

  return response.json();
};
