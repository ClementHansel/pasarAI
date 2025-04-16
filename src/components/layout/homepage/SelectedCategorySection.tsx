// src/components/layout/homepage/SelectedCategorySection.tsx

"use client";

import React from "react";
import CategoryButtons from "./CategoryButtons";
import ProductCard from "@/components/market/ProductCard";

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
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">Selected Category</h2>

      <div className="mb-6">
        {/* Category Buttons */}
        <CategoryButtons />
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Boosted Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockSelectedCategoryProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>

      {/* Bottom section for category buttons */}
      <div className="flex space-x-4 overflow-x-auto">
        <CategoryButtons />
      </div>
    </section>
  );
};

export default SelectedCategorySection;
