// src/components/layout/homepage/RecentSearchProducts.tsx

"use client";

import React from "react";
import ProductCard from "@/components/market/ProductCard";

const mockRecentSearchProducts = [
  {
    id: "1",
    name: "Noise-Cancelling Headphones",
    price: 129.99,
    description: "Over-ear headphones for quiet listening.",
    imageUrl: "/images/products/headphones.jpg",
  },
  {
    id: "2",
    name: "Smart Fitness Tracker",
    price: 199.99,
    description: "Track steps, calories, and heart rate with ease.",
    imageUrl: "/images/products/fitness_tracker.jpg",
  },
  {
    id: "3",
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    description: "Water-resistant speaker for outdoor music.",
    imageUrl: "/images/products/bluetooth_speaker.jpg",
  },
];

const RecentSearchProducts = () => {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">Recent Searches</h2>
      <div className="flex space-x-4 overflow-x-auto">
        {mockRecentSearchProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default RecentSearchProducts;
