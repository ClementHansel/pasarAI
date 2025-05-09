// src/components/product/ProductCategory.tsx
"use client";
import React from "react";
import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductCategoryProps {
  type: "domestic" | "global";
  regions: ""; // Replace with proper MarketRegion type
  viewMode: "grid" | "list";
  searchQuery?: string;
  categoryFilter?: string;
  selectedFilters: "";
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

export const ProductCategory: React.FC<ProductCategoryProps> = ({
  type,
  // regions,
  // viewMode = "list",
  // searchQuery = "",
  // categoryFilter = "",
  // selectedFilters = {},
  products,
}) => {
  return (
    <div className="space-y-6">
      {products.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl">
          No products found matching your criteria
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              marketType={type === "domestic" ? "Domestic" : "International"}
              currency={product.currency?.code || "IDR"}
            />
          ))}
        </div>
      )}
    </div>
  );
};
