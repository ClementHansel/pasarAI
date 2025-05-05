// src/data/analytics/productAnalytics.ts

import { ProductAnalytics as AnalyticsType } from "src/types/ai/analyticsTypes";

export async function getProductAnalytics(): Promise<AnalyticsType[]> {
  try {
    return [
      {
        date: "2025-05-01", // Added for consistency with other analytics
        totalProductsSold: 110, // Renamed to match the new type
        topProduct: "Wireless Headphones", // Renamed to match the new type
        mostPopularCategory: "Electronics", // Renamed to match the new type
        stockStatus: "Low", // Added for the new type (based on stock remaining)
      },
      {
        date: "2025-05-02",
        totalProductsSold: 80,
        topProduct: "Organic Green Tea",
        mostPopularCategory: "Beverages",
        stockStatus: "High", // Stock remaining is high
      },
      {
        date: "2025-05-03",
        totalProductsSold: 65,
        topProduct: "Yoga Mat Pro Series",
        mostPopularCategory: "Fitness",
        stockStatus: "Medium", // Moderate stock
      },
      {
        date: "2025-05-04",
        totalProductsSold: 50,
        topProduct: "Minimalist Desk Lamp",
        mostPopularCategory: "Home & Living",
        stockStatus: "Low",
      },
      {
        date: "2025-05-05",
        totalProductsSold: 200,
        topProduct: "Reusable Water Bottle 1L",
        mostPopularCategory: "Lifestyle",
        stockStatus: "High",
      },
    ];
  } catch (error) {
    console.error("Error fetching product analytics:", error);
    return []; // Return empty array in case of error
  }
}
