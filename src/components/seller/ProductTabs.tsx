// src/components/seller/ProductsTab.tsx
"use client";

import { useState } from "react";
import ProductFilter from "../product/ProductFilter";
import SellerProductCard from "./SellerProductCard";
import type { ProductFilterInput } from "@/types/product";

export const ProductsTab = ({
  products,
}: {
  products: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    stock: number;
    sold: number;
    rating: number;
    createdAt?: string | Date; // Make createdAt optional for sorting
  }>;
}) => {
  const [minRating, setMinRating] = useState(0);
  const [inStock, setInStock] = useState(false);
  const [sortBy, setSortBy] =
    useState<ProductFilterInput["sortBy"]>("price_asc");

  const handleFilterChange = (
    filterInput: ProductFilterInput & { minRating?: number }
  ) => {
    if (typeof filterInput.minRating === "number")
      setMinRating(filterInput.minRating);
    if (typeof filterInput.inStock === "boolean")
      setInStock(filterInput.inStock);
    if (filterInput.sortBy) setSortBy(filterInput.sortBy);
  };

  const filteredProducts = products
    .filter((p) => !inStock || p.stock > 0)
    .filter((p) => p.rating >= minRating)
    .sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest") {
        const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bDate - aDate;
      }
      return 0;
    });

  return (
    <>
      <ProductFilter
        value={{ sortBy, inStock }}
        onFilterChange={handleFilterChange}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <SellerProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
