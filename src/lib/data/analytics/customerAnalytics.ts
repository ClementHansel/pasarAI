// src/data/analytics/customerAnalytics.ts

export async function getCustomerAnalytics() {
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
}
