// src/data/analytics/returnsAnalytics.ts

interface ReturnsAnalytics {
  date: string;
  totalReturns: number;
  returnRate: number; // percentage
  mostReturnedCategory: string;
  mostReturnedReason: string;
}

export async function getReturnsAnalytics(): Promise<ReturnsAnalytics[]> {
  try {
    return [
      {
        date: "2025-05-01",
        totalReturns: 25,
        returnRate: 2.6,
        mostReturnedCategory: "Fashion",
        mostReturnedReason: "Size issue",
      },
      {
        date: "2025-05-02",
        totalReturns: 19,
        returnRate: 2.2,
        mostReturnedCategory: "Electronics",
        mostReturnedReason: "Defective item",
      },
      {
        date: "2025-05-03",
        totalReturns: 22,
        returnRate: 2.3,
        mostReturnedCategory: "Home & Living",
        mostReturnedReason: "Not as described",
      },
      {
        date: "2025-05-04",
        totalReturns: 30,
        returnRate: 2.9,
        mostReturnedCategory: "Beauty",
        mostReturnedReason: "Skin reaction",
      },
      {
        date: "2025-05-05",
        totalReturns: 27,
        returnRate: 2.8,
        mostReturnedCategory: "Fashion",
        mostReturnedReason: "Color mismatch",
      },
    ];
  } catch (error) {
    console.error("Error fetching returns analytics:", error);
    return []; // Return empty array in case of error
  }
}
