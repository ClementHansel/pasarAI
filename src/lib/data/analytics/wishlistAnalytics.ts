// src/data/analytics/wishlistAnalytics.ts

export async function getWishlistAnalytics() {
  return [
    {
      date: "2025-05-01",
      wishlistsCreated: 120,
      itemsWished: 450,
      topCategory: "Electronics",
      mostWishedProduct: "Wireless Headphones",
      conversionRate: 25, // percentage of wished items that were purchased
    },
    {
      date: "2025-05-02",
      wishlistsCreated: 150,
      itemsWished: 510,
      topCategory: "Home & Living",
      mostWishedProduct: "Smart Lamp",
      conversionRate: 27,
    },
    {
      date: "2025-05-03",
      wishlistsCreated: 90,
      itemsWished: 320,
      topCategory: "Fashion",
      mostWishedProduct: "Denim Jacket",
      conversionRate: 22,
    },
    {
      date: "2025-05-04",
      wishlistsCreated: 130,
      itemsWished: 470,
      topCategory: "Electronics",
      mostWishedProduct: "Bluetooth Speaker",
      conversionRate: 29,
    },
    {
      date: "2025-05-05",
      wishlistsCreated: 160,
      itemsWished: 560,
      topCategory: "Beauty",
      mostWishedProduct: "Organic Skincare Set",
      conversionRate: 31,
    },
  ];
}
