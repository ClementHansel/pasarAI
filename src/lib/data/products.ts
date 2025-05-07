import { Currency, Seller } from "@/types/market";
import {
  ProductRegion,
  Product,
  Category,
  Review,
  Brand,
} from "@/types/product";

// Mock Categories
const categoryVegetables: Category = {
  id: "1",
  name: "Vegetables",
  description: "Fresh and organic vegetables",
  createdAt: new Date(),
};

const categoryDairy: Category = {
  id: "2",
  name: "Dairy",
  description: "Milk, cheese, and more",
  createdAt: new Date(),
};

const categoryFruits: Category = {
  id: "3",
  name: "Fruits",
  description: "Sweet and fresh fruits",
  createdAt: new Date(),
};

// Mock Reviews
const reviews: Review[] = [
  {
    id: "1",
    accountId: "101",
    rating: 4,
    comment: "Very fresh and good quality!",
    createdAt: new Date(),
  },
  {
    id: "2",
    accountId: "102",
    rating: 5,
    comment: "Highly recommended.",
    createdAt: new Date(),
  },
];

// Mock Sellers
const sellers: Seller[] = [
  {
    id: "seller-1",
    name: "Pasar AI Store",
    rating: 4.7,
    location: "Indonesia",
    verified: true,
    role: "seller",
    currency: Currency.IDR, // ensure this is declared as a valid Currency in your types
  },
];

// Mock Brand
const mockBrand: Brand = {
  id: "1",
  name: "PasarAI Brand",
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Product Factory
const createProduct = (
  id: string,
  name: string,
  category: Category
): Product => ({
  id,
  name,
  description: `${name} - a high-quality product.`,
  price: 10000 + Number(id) * 100,
  originalPrice: 12000 + Number(id) * 100,
  stock: 15 + Number(id),
  isAvailable: true,
  category,
  tags: ["fresh", "local"],
  imageUrls: [`/images/products/${id}.jpg`],
  createdAt: new Date(),
  updatedAt: new Date(),
  lastSoldAt: new Date(),
  rating: 4.5,
  reviews,
  labels: [],
  discount: 10,
  isFeatured: Number(id) % 2 === 0,
  isActive: true,
  brand: [mockBrand],
  marketId: "market-001",
  currency: "IDR",
  accountId: "account-001",
  marketType: "domestic",
});

// Domestic Products
export const domesticProducts: ProductRegion[] = [
  {
    id: "region-1",
    name: "Java",
    sellers,
    subregions: [
      {
        id: "subregion-1",
        name: "West Java",
        sellers,
        cities: [
          {
            id: "city-1",
            name: "Bandung",
            sellers,
            products: [
              createProduct("1", "Organic Carrot", categoryVegetables),
              createProduct("2", "Fresh Milk", categoryDairy),
            ],
          },
          {
            id: "city-2",
            name: "Bogor",
            sellers,
            products: [
              createProduct("3", "Red Apple", categoryFruits),
              createProduct("4", "Broccoli", categoryVegetables),
            ],
          },
        ],
      },
    ],
  },
  {
    id: "region-2",
    name: "Sumatra",
    sellers,
    subregions: [
      {
        id: "subregion-2",
        name: "North Sumatra",
        sellers,
        cities: [
          {
            id: "city-3",
            name: "Medan",
            sellers,
            products: [
              createProduct("5", "Avocado", categoryFruits),
              createProduct("6", "Cassava", categoryVegetables),
            ],
          },
        ],
      },
    ],
  },
];

// Global Products
export const globalProducts: ProductRegion[] = [
  {
    id: "region-3",
    name: "Asia",
    sellers,
    subregions: [
      {
        id: "subregion-3",
        name: "Southeast Asia",
        sellers,
        cities: [
          {
            id: "city-4",
            name: "Bangkok",
            sellers,
            products: [
              createProduct("7", "Thai Mango", categoryFruits),
              createProduct("8", "Coconut Milk", categoryDairy),
            ],
          },
        ],
      },
    ],
  },
  {
    id: "region-4",
    name: "Europe",
    sellers,
    subregions: [
      {
        id: "subregion-4",
        name: "Western Europe",
        sellers,
        cities: [
          {
            id: "city-5",
            name: "Paris",
            sellers,
            products: [
              createProduct("9", "Camembert Cheese", categoryDairy),
              createProduct("10", "Cherries", categoryFruits),
            ],
          },
        ],
      },
    ],
  },
];
