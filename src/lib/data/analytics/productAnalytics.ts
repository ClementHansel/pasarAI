// src/data/analytics/productAnalytics.ts

export async function getProductAnalytics() {
  return [
    {
      id: "prod-001",
      name: "Wireless Headphones",
      category: "Electronics",
      views: 1420,
      clicks: 320,
      purchases: 110,
      conversionRate: 7.75, // %
      revenue: 32900, // in your local currency (e.g., IDR/USD)
      stock: 45,
      ratings: 4.5,
    },
    {
      id: "prod-002",
      name: "Organic Green Tea",
      category: "Beverages",
      views: 830,
      clicks: 140,
      purchases: 80,
      conversionRate: 9.64,
      revenue: 6400,
      stock: 120,
      ratings: 4.7,
    },
    {
      id: "prod-003",
      name: "Yoga Mat Pro Series",
      category: "Fitness",
      views: 970,
      clicks: 220,
      purchases: 65,
      conversionRate: 6.7,
      revenue: 13000,
      stock: 75,
      ratings: 4.3,
    },
    {
      id: "prod-004",
      name: "Minimalist Desk Lamp",
      category: "Home & Living",
      views: 670,
      clicks: 180,
      purchases: 50,
      conversionRate: 7.46,
      revenue: 11250,
      stock: 20,
      ratings: 4.1,
    },
    {
      id: "prod-005",
      name: "Reusable Water Bottle 1L",
      category: "Lifestyle",
      views: 1500,
      clicks: 400,
      purchases: 200,
      conversionRate: 13.33,
      revenue: 10000,
      stock: 200,
      ratings: 4.8,
    },
  ];
}
