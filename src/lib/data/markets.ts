// src/lib/data/markets.ts
import type { MarketRegion } from "@/types/market";
import { Currency } from "@/types/market"; // Import the Currency enum

export const domesticMarkets: MarketRegion[] = [
  {
    name: "Jawa Barat",
    subregions: [
      {
        name: "Bandung",
        cities: [
          {
            name: "Bandung Kota",
            sellers: [
              {
                id: "seller-001",
                name: "Toko Sapi Bandung",
                currency: Currency.IDR,
              },
              {
                id: "seller-002",
                name: "Sayur Lembang",
                currency: Currency.IDR,
              },
            ],
          },
          {
            name: "Cimahi",
            sellers: [
              { id: "seller-003", name: "Ayam Cimahi", currency: Currency.IDR },
            ],
          },
        ],
      },
      {
        name: "Bekasi",
        cities: [
          {
            name: "Bekasi Selatan",
            sellers: [
              {
                id: "seller-004",
                name: "Daging Bekasi",
                currency: Currency.IDR,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Jawa Timur",
    subregions: [
      {
        name: "Surabaya",
        cities: [
          {
            name: "Surabaya Pusat",
            sellers: [
              {
                id: "seller-005",
                name: "Sayur Surabaya",
                currency: Currency.IDR,
              },
            ],
          },
        ],
      },
    ],
  },
];

export const globalMarkets: MarketRegion[] = [
  {
    name: "United States",
    subregions: [
      {
        name: "California",
        cities: [
          {
            name: "Los Angeles",
            sellers: [
              {
                id: "seller-101",
                name: "LA Fresh Produce",
                currency: Currency.USD,
              },
            ],
          },
          {
            name: "San Francisco",
            sellers: [
              {
                id: "seller-102",
                name: "SF Organic Meats",
                currency: Currency.USD,
              },
            ],
          },
        ],
      },
      {
        name: "New York",
        cities: [
          {
            name: "New York City",
            sellers: [
              {
                id: "seller-103",
                name: "NYC Grocery Store",
                currency: Currency.USD,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Japan",
    subregions: [
      {
        name: "Tokyo",
        cities: [
          {
            name: "Shibuya",
            sellers: [
              {
                id: "seller-201",
                name: "Tokyo Fish Market",
                currency: Currency.USD,
              },
            ],
          },
          {
            name: "Ikebukuro",
            sellers: [
              {
                id: "seller-202",
                name: "Tokyo Veggie Shop",
                currency: Currency.USD,
              },
            ],
          },
        ],
      },
      {
        name: "Osaka",
        cities: [
          {
            name: "Namba",
            sellers: [
              {
                id: "seller-203",
                name: "Osaka Seafood Market",
                currency: Currency.USD,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Germany",
    subregions: [
      {
        name: "Bavaria",
        cities: [
          {
            name: "Munich",
            sellers: [
              {
                id: "seller-301",
                name: "Munich Organic Market",
                currency: Currency.USD,
              },
            ],
          },
        ],
      },
    ],
  },
];
