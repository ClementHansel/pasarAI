// src/data/analytics/wishlistAnalytics.ts

import { WishlistAnalytics as AnalyticsType } from "src/types/ai/analyticsTypes";

export async function getWishlistAnalytics(): Promise<AnalyticsType[]> {
  try {
    return [
      {
        date: "2025-05-01", // Added for consistency with other analytics
        totalWishlists: 120, // Changed to match the prompt
        mostAddedProduct: "Wireless Headphones", // Changed to match the prompt
        abandonmentRate: 75, // Conversion rate is used to calculate abandonment rate (100 - conversionRate)
      },
      {
        date: "2025-05-02",
        totalWishlists: 150,
        mostAddedProduct: "Smart Lamp",
        abandonmentRate: 73,
      },
      {
        date: "2025-05-03",
        totalWishlists: 90,
        mostAddedProduct: "Denim Jacket",
        abandonmentRate: 78,
      },
      {
        date: "2025-05-04",
        totalWishlists: 130,
        mostAddedProduct: "Bluetooth Speaker",
        abandonmentRate: 71,
      },
      {
        date: "2025-05-05",
        totalWishlists: 160,
        mostAddedProduct: "Organic Skincare Set",
        abandonmentRate: 69,
      },
    ];
  } catch (error) {
    console.error("Error fetching wishlist analytics:", error);
    return []; // Return empty array in case of error
  }
}
