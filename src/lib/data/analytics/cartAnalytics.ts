// src/lib/data/analytics/cartAnalytics.ts

import { CartAnalytics as AnalyticsType } from "src/types/ai/analyticsTypes";

export async function getCartAnalytics(): Promise<AnalyticsType[]> {
  try {
    // Simulating fetching cart analytics data
    return [
      {
        date: "2025-05-01",
        totalCartsCreated: 320,
        abandonedCarts: 50, // Example value for abandoned carts
        mostPopularProduct: "Product A", // Example most popular product
        avgCartValue: 110000, // Average cart value
      },
      {
        date: "2025-05-02",
        totalCartsCreated: 400,
        abandonedCarts: 60,
        mostPopularProduct: "Product B",
        avgCartValue: 124000,
      },
      {
        date: "2025-05-03",
        totalCartsCreated: 280,
        abandonedCarts: 45,
        mostPopularProduct: "Product C",
        avgCartValue: 95000,
      },
      {
        date: "2025-05-04",
        totalCartsCreated: 350,
        abandonedCarts: 55,
        mostPopularProduct: "Product D",
        avgCartValue: 119000,
      },
      {
        date: "2025-05-05",
        totalCartsCreated: 430,
        abandonedCarts: 65,
        mostPopularProduct: "Product E",
        avgCartValue: 131000,
      },
    ];
  } catch (error) {
    console.error("Error fetching cart analytics:", error);
    return []; // Return empty array in case of error
  }
}
