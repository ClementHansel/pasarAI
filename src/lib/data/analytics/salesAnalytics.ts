// src/data/analytics/salesAnalytics.ts

interface SalesAnalytics {
  date: string;
  totalOrders: number;
  totalUnitsSold: number;
  topCategory: string;
  topProduct: string;
  avgOrderValue: number; // average order value
}

export async function getSalesAnalytics(): Promise<SalesAnalytics[]> {
  try {
    return [
      {
        date: "2025-05-01",
        totalOrders: 340,
        totalUnitsSold: 920,
        topCategory: "Electronics",
        topProduct: "Smartphone A1",
        avgOrderValue: 84.25,
      },
      {
        date: "2025-05-02",
        totalOrders: 295,
        totalUnitsSold: 865,
        topCategory: "Fashion",
        topProduct: "Denim Jacket",
        avgOrderValue: 78.6,
      },
      {
        date: "2025-05-03",
        totalOrders: 310,
        totalUnitsSold: 980,
        topCategory: "Home & Living",
        topProduct: "Aroma Diffuser",
        avgOrderValue: 75.1,
      },
      {
        date: "2025-05-04",
        totalOrders: 360,
        totalUnitsSold: 1040,
        topCategory: "Electronics",
        topProduct: "Wireless Earbuds",
        avgOrderValue: 81.75,
      },
      {
        date: "2025-05-05",
        totalOrders: 330,
        totalUnitsSold: 930,
        topCategory: "Beauty",
        topProduct: "Skincare Kit",
        avgOrderValue: 79.45,
      },
    ];
  } catch (error) {
    console.error("Error fetching sales analytics:", error);
    return []; // Return empty array in case of error
  }
}
