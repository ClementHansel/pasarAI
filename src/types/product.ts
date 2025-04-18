// src/types/product.ts

import { Label } from "@prisma/client";

// Product Types
export type Product = {
  id: number; // Unique identifier for the product
  name: string; // Name of the product
  description: string; // Description of the product
  price: number; // Price of the product
  originalPrice: number | null;
  stock: number; // Stock count (for real-time stock management)
  isAvailable: boolean; // Availability status (in stock or out of stock)
  category?: Category; // Category the product belongs to (e.g., electronics, clothing)
  tags: string[]; // Tags for filtering (e.g., sale, new arrival, eco-friendly)
  imageUrls: string[]; // Array of URLs for product images (for multiple images)
  createdAt: Date; // When the product was created
  updatedAt: Date; // Last time the product was updated
  lastSoldAt?: Date | null; // Last time the product was sold (for analytics)
  rating: number; // Average rating of the product (e.g., out of 5)
  reviews: Review[]; // Reviews associated with the product
  labels: Label;
  discount?: number;
  isFeatured?: boolean;
  isActive?: boolean;
};

// Product creation input type (for creating new products)
export type CreateProductInput = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  tags?: string[];
  imageUrls: string[]; // Accepting multiple images during product creation
};

// Product update input type (for updating existing products)
export type UpdateProductInput = {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  isAvailable?: boolean;
  category?: string;
  tags?: string[];
  imageUrls?: string[]; // Optional, to update images
};

// Product with additional user-related information (e.g., for showing the seller's info in a marketplace)
export type ProductWithUser = Product & {
  sellerId: number; // ID of the seller who owns the product
  sellerName: string; // Name of the seller
  sellerRating: number; // Rating of the seller (for marketplace scenarios)
};

// Review Type (related to product reviews)
export type Review = {
  id: number; // Unique identifier for the review
  userId: number; // ID of the user who posted the review
  rating: number; // Rating given in the review (e.g., out of 5)
  comment: string; // Text comment in the review
  createdAt: Date; // When the review was posted
};

// Real-time stock management
export type StockUpdate = {
  productId: number; // The product being updated
  stockDelta: number; // The amount of stock change (positive or negative)
  updatedAt: Date; // The timestamp of the stock update
};

// Real-time pricing updates
export type PriceUpdate = {
  productId: number; // The product being updated
  oldPrice: number; // Old price before the update
  newPrice: number; // New price after the update
  updatedAt: Date; // The timestamp of the price update
};

// Real-time product availability update
export type ProductAvailabilityUpdate = {
  productId: number; // The product being updated
  isAvailable: boolean; // Whether the product is now available or not
  updatedAt: Date; // The timestamp of the availability update
};

// Category Type (for organizing products)
export type Category = {
  id: number; // Unique identifier for the category
  name: string; // Name of the category (e.g., electronics, clothing)
  description: string; // Description of the category
  createdAt: Date; // When the category was created
};

// Type for inventory-related statistics (e.g., when displaying a dashboard)
export type InventoryStats = {
  totalProducts: number; // Total number of products
  totalStock: number; // Total stock across all products
  totalValue: number; // Total value of all products in stock (price * stock)
  lowStockCount: number; // Count of products with low stock
  outOfStockCount: number; // Count of products that are out of stock
};
