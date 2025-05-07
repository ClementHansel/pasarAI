// src/data/analytics/checkoutAnalytics.ts

import { CheckoutAnalytics as AnalyticsType } from "src/types/ai/analyticsTypes";

export async function getCheckoutAnalytics(): Promise<AnalyticsType[]> {
  try {
    // Simulating fetching checkout analytics data
    return [
      {
        date: "2025-05-01",
        totalCheckouts: 240, // Renamed to match type
        completedCheckouts: 180, // Renamed to match type
        abandonmentRate: 25, // Calculated as abandoned / initiated * 100
        paymentMethodPreference: "Credit Card", // Added for the new type
      },
      {
        date: "2025-05-02",
        totalCheckouts: 310,
        completedCheckouts: 245,
        abandonmentRate: 21, // Same calculation for abandonment rate
        paymentMethodPreference: "Debit Card",
      },
      {
        date: "2025-05-03",
        totalCheckouts: 190,
        completedCheckouts: 140,
        abandonmentRate: 26,
        paymentMethodPreference: "PayPal",
      },
      {
        date: "2025-05-04",
        totalCheckouts: 280,
        completedCheckouts: 230,
        abandonmentRate: 18,
        paymentMethodPreference: "Credit Card",
      },
      {
        date: "2025-05-05",
        totalCheckouts: 330,
        completedCheckouts: 300,
        abandonmentRate: 9,
        paymentMethodPreference: "PayPal",
      },
    ];
  } catch (error) {
    console.error("Error fetching checkout analytics:", error);
    return []; // Return empty array in case of error
  }
}
