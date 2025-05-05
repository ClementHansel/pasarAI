// src/data/analytics/salesAnalytics.ts

export async function getSalesAnalytics() {
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
}
