import { ProductRegion, Product, Category, Review } from "@/types/product";

// Mock Categories
const categoryVegetables: Category = {
  id: 1,
  name: "Vegetables",
  description: "Fresh and organic vegetables",
  createdAt: new Date(),
};

const categoryDairy: Category = {
  id: 2,
  name: "Dairy",
  description: "Milk, cheese, and more",
  createdAt: new Date(),
};

const categoryFruits: Category = {
  id: 3,
  name: "Fruits",
  description: "Sweet and fresh fruits",
  createdAt: new Date(),
};

// Mock Reviews
const reviews: Review[] = [
  {
    id: 1,
    userId: 101,
    rating: 4,
    comment: "Very fresh and good quality!",
    createdAt: new Date(),
  },
  {
    id: 2,
    userId: 102,
    rating: 5,
    comment: "Highly recommended.",
    createdAt: new Date(),
  },
];

// Base product
const createProduct = (
  id: number,
  name: string,
  category: Category
): Product => ({
  id,
  name,
  brand: [
    {
      id: id,
      name: `Brand-${id}`,
      description: `Official brand for ${name}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  description: `${name} - a high-quality product.`,
  price: 10000 + id * 100,
  originalPrice: 12000 + id * 100,
  stock: 15 + id,
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
  isFeatured: id % 2 === 0,
  isActive: true,
});

// Domestic Products
export const domesticProducts: ProductRegion[] = [
  {
    id: "region-1",
    name: "Java",
    subregions: [
      {
        id: "subregion-1",
        name: "West Java",
        cities: [
          {
            id: "city-1",
            name: "Bandung",
            products: [
              createProduct(1, "Organic Carrot", categoryVegetables),
              createProduct(2, "Fresh Milk", categoryDairy),
            ],
          },
          {
            id: "city-2",
            name: "Bogor",
            products: [
              createProduct(3, "Red Apple", categoryFruits),
              createProduct(4, "Broccoli", categoryVegetables),
            ],
          },
        ],
      },
    ],
  },
  {
    id: "region-2",
    name: "Sumatra",
    subregions: [
      {
        id: "subregion-2",
        name: "North Sumatra",
        cities: [
          {
            id: "city-3",
            name: "Medan",
            products: [
              createProduct(5, "Avocado", categoryFruits),
              createProduct(6, "Cassava", categoryVegetables),
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
    subregions: [
      {
        id: "subregion-3",
        name: "Southeast Asia",
        cities: [
          {
            id: "city-4",
            name: "Bangkok",
            products: [
              createProduct(7, "Thai Mango", categoryFruits),
              createProduct(8, "Coconut Milk", categoryDairy),
            ],
          },
        ],
      },
    ],
  },
  {
    id: "region-4",
    name: "Europe",
    subregions: [
      {
        id: "subregion-4",
        name: "Western Europe",
        cities: [
          {
            id: "city-5",
            name: "Paris",
            products: [
              createProduct(9, "Camembert Cheese", categoryDairy),
              createProduct(10, "Cherries", categoryFruits),
            ],
          },
        ],
      },
    ],
  },
];
