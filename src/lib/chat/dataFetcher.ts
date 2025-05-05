// src/lib/chat/dataFetcher.ts

import { getProductAnalytics } from "../data/analytics/productAnalytics";
import { getCheckoutAnalytics } from "../data/analytics/checkoutAnalytics";
import { getCartAnalytics } from "../data/analytics/cartAnalytics";
import { getWishlistAnalytics } from "../data/analytics/wishlistAnalytics";
import { getSalesAnalytics } from "../data/analytics/salesAnalytics";
import { getReturnsAnalytics } from "../data/analytics/returnsAnalytics";
import { getCustomerAnalytics } from "../data/analytics/customerAnalytics";
import { getRevenueAnalytics } from "../data/analytics/revenueAnalytics";
import { AnalyticsType } from "@/types/ai/analyticsTypes";

// Keywords to help AI intent classifier or fuzzy search
const analyticsKeywordsMap: Record<AnalyticsType, string[]> = {
  products: ["product", "catalog", "item", "stock"],
  checkout: ["checkout", "purchase", "transaction"],
  cart: ["cart", "abandon", "shopping"],
  wishlist: ["wishlist", "favorite", "saved"],
  sales: ["sales", "sold", "selling"],
  returns: ["return", "refund", "cancel"],
  customers: ["user", "customer", "buyer", "audience"],
  revenue: ["money", "income", "revenue", "earning"],
};

// Main fetch function
export async function fetchAnalytics(type: AnalyticsType) {
  switch (type) {
    case "products":
      return getProductAnalytics();
    case "checkout":
      return getCheckoutAnalytics();
    case "cart":
      return getCartAnalytics();
    case "wishlist":
      return getWishlistAnalytics();
    case "sales":
      return getSalesAnalytics();
    case "returns":
      return getReturnsAnalytics();
    case "customers":
      return getCustomerAnalytics();
    case "revenue":
      return getRevenueAnalytics();
    default:
      throw new Error(`Unknown analytics type: ${type}`);
  }
}

// Infer analytics type from AI prompt
export function inferAnalyticsTypeFromPrompt(
  prompt: string
): AnalyticsType | null {
  const lower = prompt.toLowerCase();
  for (const [type, keywords] of Object.entries(analyticsKeywordsMap)) {
    if (keywords.some((keyword) => lower.includes(keyword))) {
      return type as AnalyticsType;
    }
  }
  return null;
}

// Optionally expose the list of available types
export const availableAnalyticsTypes: AnalyticsType[] = Object.keys(
  analyticsKeywordsMap
) as AnalyticsType[];
