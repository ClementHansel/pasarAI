import { Label } from "@prisma/client";

// Product Types
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number | null;
  stock: number;
  isAvailable: boolean;
  category?: Category; // Category is optional
  tags: string[];
  imageUrls: string[];
  createdAt: Date;
  updatedAt: Date;
  lastSoldAt?: Date | null;
  rating: number;
  reviews: Review[];
  labels: Label[];
  discount?: number;
  isFeatured?: boolean;
  isActive?: boolean;
};

// Used for filtering between product types (e.g., Domestic vs Global)
export type ProductType = "domestic" | "global";

// Product creation input type
export type CreateProductInput = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  tags?: string[];
  imageUrls: string[];
};

// Product update input type
export type UpdateProductInput = {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  isAvailable?: boolean;
  category?: string;
  tags?: string[];
  imageUrls?: string[];
};

// Product with seller info
export type ProductWithUser = Product & {
  sellerId: number;
  sellerName: string;
  sellerRating: number;
};

// Review type
export type Review = {
  id: number;
  userId: number;
  rating: number;
  comment: string;
  createdAt: Date;
};

// Inventory updates
export type StockUpdate = {
  productId: number;
  stockDelta: number;
  updatedAt: Date;
};

export type PriceUpdate = {
  productId: number;
  oldPrice: number;
  newPrice: number;
  updatedAt: Date;
};

export type ProductAvailabilityUpdate = {
  productId: number;
  isAvailable: boolean;
  updatedAt: Date;
};

// Category Type
export type Category = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
};

// Inventory statistics
export type InventoryStats = {
  totalProducts: number;
  totalStock: number;
  totalValue: number;
  lowStockCount: number;
  outOfStockCount: number;
};

// Product Hierarchy
export type ProductCity = {
  id: string;
  name: string;
  products: Product[];
};

export type ProductSubregion = {
  id: string;
  name: string;
  cities: ProductCity[];
};

export type ProductRegion = {
  id: string;
  name: string;
  subregions: ProductSubregion[];
};
