// src/data/analytics/cartAnalytics.ts

export async function getCartAnalytics() {
  return [
    {
      date: "2025-05-01",
      cartsCreated: 320,
      itemsAdded: 870,
      itemsRemoved: 210,
      avgCartValue: 110000,
      conversionRate: 56, // percentage of carts that turned into orders
    },
    {
      date: "2025-05-02",
      cartsCreated: 400,
      itemsAdded: 1020,
      itemsRemoved: 300,
      avgCartValue: 124000,
      conversionRate: 61,
    },
    {
      date: "2025-05-03",
      cartsCreated: 280,
      itemsAdded: 720,
      itemsRemoved: 180,
      avgCartValue: 95000,
      conversionRate: 50,
    },
    {
      date: "2025-05-04",
      cartsCreated: 350,
      itemsAdded: 910,
      itemsRemoved: 240,
      avgCartValue: 119000,
      conversionRate: 58,
    },
    {
      date: "2025-05-05",
      cartsCreated: 430,
      itemsAdded: 1180,
      itemsRemoved: 260,
      avgCartValue: 131000,
      conversionRate: 64,
    },
  ];
}
