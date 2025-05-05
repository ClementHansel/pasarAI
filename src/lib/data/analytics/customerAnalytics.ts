// src/data/analytics/customerAnalytics.ts

interface CustomerAnalytics {
  date: string;
  newCustomers: number;
  returningCustomers: number;
  churnRate: number; // percentage
  satisfactionScore: number; // 1-10 scale
}

export async function getCustomerAnalytics(): Promise<CustomerAnalytics[]> {
  try {
    return [
      {
        date: "2025-05-01",
        newCustomers: 95,
        returningCustomers: 120,
        churnRate: 3.5,
        satisfactionScore: 8.1,
      },
      {
        date: "2025-05-02",
        newCustomers: 88,
        returningCustomers: 135,
        churnRate: 3.8,
        satisfactionScore: 7.9,
      },
      {
        date: "2025-05-03",
        newCustomers: 102,
        returningCustomers: 125,
        churnRate: 3.2,
        satisfactionScore: 8.3,
      },
      {
        date: "2025-05-04",
        newCustomers: 110,
        returningCustomers: 140,
        churnRate: 3.0,
        satisfactionScore: 8.5,
      },
      {
        date: "2025-05-05",
        newCustomers: 97,
        returningCustomers: 138,
        churnRate: 3.4,
        satisfactionScore: 8.0,
      },
    ];
  } catch (error) {
    console.error("Error fetching customer analytics:", error);
    return []; // Return empty array in case of error
  }
}
