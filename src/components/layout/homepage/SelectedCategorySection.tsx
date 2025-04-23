// src/components/layout/homepage/SelectedCategorySection.tsx

"use client";

import React from "react";
import CategoryButtons from "./CategoryButtons";
import ProductCard from "@/components/product/ProductCard";

const mockSelectedCategoryProducts = [
  {
    id: "1",
    name: "Wireless Keyboard",
    price: 59.99,
    description: "Compact wireless keyboard for easy typing.",
    imageUrl: "/images/products/keyboard.jpg",
  },
  {
    id: "2",
    name: "Ergonomic Mouse",
    price: 39.99,
    description: "Ergonomic mouse designed for comfort.",
    imageUrl: "/images/products/mouse.jpg",
  },
  {
    id: "3",
    name: "Gaming Headset",
    price: 89.99,
    description: "Over-ear headset with clear sound for gaming.",
    imageUrl: "/images/products/gaming_headset.jpg",
  },
];

const SelectedCategorySection = () => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header (with optional category buttons) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              Select Category
            </h2>
            <p className="text-gray-600 mt-2">
              Choose a category to explore tailored recommendations
            </p>
          </div>
          {/* You can add a "View All" or similar button here if needed */}
        </div>

        <div className="mb-6">
          <CategoryButtons />
        </div>

        {/* Boosted Products header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Boosted Products</h3>
        </div>

        {/* Product grid styled to match FeaturedProducts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockSelectedCategoryProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              // fallback logic if no image
              imageUrl={product.imageUrl || "/images/picture-not-found.png"}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectedCategorySection;
