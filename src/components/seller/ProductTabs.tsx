// src/components/seller/ProductsTab.tsx
"use client";

import { useState } from "react";
import { PublicSellerProfile } from "@/lib/data/profile";
import ProductFilter from "../product/ProductFilter";
import SkeletonCard from "../ui/SkeletonCard";
import SellerProductCard from "./SellerProductCard";

export const ProductsTab = ({
  products,
}: {
  products: PublicSellerProfile["products"];
}) => {
  const [filters, setFilters] = useState({
    sortBy: "price" as "price" | "rating" | "stock",
    minRating: 0,
    inStock: false,
  });

  const [loading, setLoading] = useState(false);

  const filteredProducts = products
    .filter((p) => !filters.inStock || p.stock > 0)
    .filter((p) => p.rating >= filters.minRating)
    .sort((a, b) => {
      if (filters.sortBy === "price") return a.price - b.price;
      if (filters.sortBy === "rating") return b.rating - a.rating;
      if (filters.sortBy === "stock") return b.stock - a.stock;
      return 0;
    });

  return (
    <>
      <ProductFilter filters={filters} onFilterChange={setFilters} />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <SellerProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};
