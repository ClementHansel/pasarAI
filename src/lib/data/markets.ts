// src/lib/data/markets.ts
import type { MarketRegion } from "@/types/market";
import { Currency } from "@/types/market"; // Import the Currency enum

export const domesticMarkets: MarketRegion[] = [
  {
    id: "jabar",
    name: "Jawa Barat",
    region: "Indonesia",
    subRegions: [
      {
        id: "Bandung",
        name: "Bandung",
        cities: [
          {
            id: "Bandung",
            name: "Bandung Kota",
            sellers: [
              {
                id: "seller-001",
                name: "Toko Sapi Bandung",
                role: "seller",
                currency: Currency.IDR,
              },
              {
                id: "seller-002",
                name: "Sayur Lembang",
                role: "seller",
                currency: Currency.IDR,
              },
            ],
          },
          {
            id: "Cimahi",
            name: "Cimahi",
            sellers: [
              {
                id: "seller-003",
                name: "Ayam Cimahi",
                role: "seller",
                currency: Currency.IDR,
              },
            ],
          },
        ],
        sellers: [
          {
            id: "seller-001",
            name: "Toko Sapi Bandung",
            role: "seller",
            currency: Currency.IDR,
          },
          {
            id: "seller-002",
            name: "Sayur Lembang",
            role: "seller",
            currency: Currency.IDR,
          },
          {
            id: "seller-003",
            name: "Ayam Cimahi",
            role: "seller",
            currency: Currency.IDR,
          },
        ],
      },
      {
        id: "Bekasi",
        name: "Bekasi",
        cities: [
          {
            id: "BekasiSelatan",
            name: "Bekasi Selatan",
            sellers: [
              {
                id: "seller-004",
                name: "Daging Bekasi",
                role: "seller",
                currency: Currency.IDR,
              },
            ],
          },
        ],
        sellers: [
          {
            id: "seller-004",
            name: "Daging Bekasi",
            role: "seller",
            currency: Currency.IDR,
          },
        ],
      },
    ],
    sellers: [], // Optional if not used at MarketRegion level
  },
  {
    id: "jatim",
    name: "Jawa Timur",
    region: "Indonesia",
    subRegions: [
      {
        id: "Surabaya",
        name: "Surabaya",
        cities: [
          {
            id: "SurabayaPusat",
            name: "Surabaya Pusat",
            sellers: [
              {
                id: "seller-005",
                name: "Sayur Surabaya",
                role: "seller",
                currency: Currency.IDR,
              },
            ],
          },
        ],
        sellers: [
          {
            id: "seller-005",
            name: "Sayur Surabaya",
            role: "seller",
            currency: Currency.IDR,
          },
        ],
      },
    ],
    sellers: [],
  },
];

export const globalMarkets: MarketRegion[] = [
  {
    id: "us",
    name: "United States",
    region: "North America",
    subRegions: [
      {
        id: "california",
        name: "California",
        cities: [
          {
            id: "los-angeles",
            name: "Los Angeles",
            sellers: [
              {
                id: "seller-101",
                name: "LA Fresh Produce",
                role: "seller",
                currency: Currency.USD,
              },
            ],
          },
          {
            id: "san-francisco",
            name: "San Francisco",
            sellers: [
              {
                id: "seller-102",
                name: "SF Organic Meats",
                role: "seller",
                currency: Currency.USD,
              },
            ],
          },
        ],
        sellers: [
          {
            id: "seller-101",
            name: "LA Fresh Produce",
            role: "seller",
            currency: Currency.USD,
          },
          {
            id: "seller-102",
            name: "SF Organic Meats",
            role: "seller",
            currency: Currency.USD,
          },
        ],
      },
      {
        id: "new-york",
        name: "New York",
        cities: [
          {
            id: "nyc",
            name: "New York City",
            sellers: [
              {
                id: "seller-103",
                name: "NYC Grocery Store",
                role: "seller",
                currency: Currency.USD,
              },
            ],
          },
        ],
        sellers: [
          {
            id: "seller-103",
            name: "NYC Grocery Store",
            role: "seller",
            currency: Currency.USD,
          },
        ],
      },
    ],
    sellers: [],
  },
  {
    id: "japan",
    name: "Japan",
    region: "Asia",
    subRegions: [
      {
        id: "tokyo",
        name: "Tokyo",
        cities: [
          {
            id: "shibuya",
            name: "Shibuya",
            sellers: [
              {
                id: "seller-201",
                name: "Tokyo Fish Market",
                role: "seller",
                currency: Currency.USD,
              },
            ],
          },
          {
            id: "ikebukuro",
            name: "Ikebukuro",
            sellers: [
              {
                id: "seller-202",
                name: "Tokyo Veggie Shop",
                role: "seller",
                currency: Currency.USD,
              },
            ],
          },
        ],
        sellers: [
          {
            id: "seller-201",
            name: "Tokyo Fish Market",
            role: "seller",
            currency: Currency.USD,
          },
          {
            id: "seller-202",
            name: "Tokyo Veggie Shop",
            role: "seller",
            currency: Currency.USD,
          },
        ],
      },
      {
        id: "osaka",
        name: "Osaka",
        cities: [
          {
            id: "namba",
            name: "Namba",
            sellers: [
              {
                id: "seller-203",
                name: "Osaka Seafood Market",
                role: "seller",
                currency: Currency.USD,
              },
            ],
          },
        ],
        sellers: [
          {
            id: "seller-203",
            name: "Osaka Seafood Market",
            role: "seller",
            currency: Currency.USD,
          },
        ],
      },
    ],
    sellers: [],
  },
  {
    id: "germany",
    name: "Germany",
    region: "Europe",
    subRegions: [
      {
        id: "bavaria",
        name: "Bavaria",
        cities: [
          {
            id: "munich",
            name: "Munich",
            sellers: [
              {
                id: "seller-301",
                name: "Munich Organic Market",
                role: "seller",
                currency: Currency.USD,
              },
            ],
          },
        ],
        sellers: [
          {
            id: "seller-301",
            name: "Munich Organic Market",
            role: "seller",
            currency: Currency.USD,
          },
        ],
      },
    ],
    sellers: [],
  },
];
