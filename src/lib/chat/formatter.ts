import {
  AnalyticsType,
  CartAnalytics,
  CheckoutAnalytics,
  CustomerAnalytics,
  ProductAnalytics,
  ReturnAnalytics,
  RevenueAnalytics,
  SalesAnalytics,
  WishlistAnalytics,
} from "@/types/ai/analyticsTypes";
import { fetchAnalytics } from "./dataFetcher";

// Define a union of all the analytics types as per your defined types
type AnalyticsData =
  | CartAnalytics[]
  | CheckoutAnalytics[]
  | ProductAnalytics[]
  | WishlistAnalytics[]
  | SalesAnalytics[]
  | ReturnAnalytics[]
  | CustomerAnalytics[]
  | RevenueAnalytics[];

// Formats the analytics data to a more readable form
function formatAnalyticsData(
  analyticsData: AnalyticsData,
  type: AnalyticsType
): string {
  // Handle different types of analytics
  switch (type) {
    case "products":
      return `Here are the product analytics: ${JSON.stringify(analyticsData)}`;
    case "checkout":
      return `Here is the checkout analytics: ${JSON.stringify(analyticsData)}`;
    case "cart":
      return `Here are the cart analytics: ${JSON.stringify(analyticsData)}`;
    case "wishlist":
      return `Here are the wishlist analytics: ${JSON.stringify(
        analyticsData
      )}`;
    case "sales":
      return `Here are the sales analytics: ${JSON.stringify(analyticsData)}`;
    case "returns":
      return `Here are the returns analytics: ${JSON.stringify(analyticsData)}`;
    case "customers":
      return `Here are the customer analytics: ${JSON.stringify(
        analyticsData
      )}`;
    case "revenue":
      return `Here are the revenue analytics: ${JSON.stringify(analyticsData)}`;
    default:
      return `Unknown analytics type: ${type}`;
  }
}

// Infer the analytics type from the user's prompt
function inferAnalyticsTypeFromPrompt(prompt: string): AnalyticsType | null {
  const lowerPrompt = prompt.toLowerCase();
  if (lowerPrompt.includes("product")) return "products";
  if (lowerPrompt.includes("checkout")) return "checkout";
  if (lowerPrompt.includes("cart")) return "cart";
  if (lowerPrompt.includes("wishlist")) return "wishlist";
  if (lowerPrompt.includes("sales")) return "sales";
  if (lowerPrompt.includes("return")) return "returns";
  if (lowerPrompt.includes("customer")) return "customers";
  if (lowerPrompt.includes("revenue")) return "revenue";
  return null; // Return null if no match is found
}

// Formats the chat response based on the user's intent
export async function formatChatResponse(prompt: string): Promise<string> {
  const analyticsType = inferAnalyticsTypeFromPrompt(prompt);
  if (analyticsType) {
    try {
      const analyticsData = await fetchAnalytics(analyticsType);
      return formatAnalyticsData(analyticsData, analyticsType);
    } catch (error: unknown) {
      // Type cast 'error' to 'Error' to access its message
      if (error instanceof Error) {
        return `Error fetching data for ${analyticsType}: ${error.message}`;
      }
      return `Unknown error occurred while fetching data for ${analyticsType}.`;
    }
  } else {
    return "Sorry, I couldn't understand the request. Can you please specify the analytics type?";
  }
}

// This function could also help with prompting users for more context, if necessary
export function formatFollowUpResponse(): string {
  return "Can you provide more details so I can better assist you with the analytics?";
}
