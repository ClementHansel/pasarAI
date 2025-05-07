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
const analyticsKeywordsMap: Record<string, AnalyticsType> = {
  products: "products",
  checkout: "checkout",
  cart: "cart",
  wishlist: "wishlist",
  sales: "sales",
  returns: "returns",
  customers: "customers",
  revenue: "revenue",
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
  for (const [keyword, type] of Object.entries(analyticsKeywordsMap)) {
    if (lower.includes(keyword)) {
      return type; // Return the correct AnalyticsType
    }
  }
  return null;
}

// Optionally expose the list of available types
export const availableAnalyticsTypes: AnalyticsType[] = Object.values(
  analyticsKeywordsMap
) as AnalyticsType[];
