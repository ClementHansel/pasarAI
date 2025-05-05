// src/data/analytics/checkoutAnalytics.ts

export async function getCheckoutAnalytics() {
  return [
    {
      date: "2025-05-01",
      initiated: 240,
      completed: 180,
      abandoned: 60,
      avgTimeToCheckout: 135, // seconds
      revenue: 450000, // in local currency
    },
    {
      date: "2025-05-02",
      initiated: 310,
      completed: 245,
      abandoned: 65,
      avgTimeToCheckout: 128,
      revenue: 620000,
    },
    {
      date: "2025-05-03",
      initiated: 190,
      completed: 140,
      abandoned: 50,
      avgTimeToCheckout: 142,
      revenue: 360000,
    },
    {
      date: "2025-05-04",
      initiated: 280,
      completed: 230,
      abandoned: 50,
      avgTimeToCheckout: 120,
      revenue: 580000,
    },
    {
      date: "2025-05-05",
      initiated: 330,
      completed: 300,
      abandoned: 30,
      avgTimeToCheckout: 110,
      revenue: 760000,
    },
  ];
}
