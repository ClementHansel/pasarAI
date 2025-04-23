"use client";

import React from "react";
import ProductCard from "@/components/product/ProductCard";

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
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              Recent Searches
            </h2>
            <p className="text-gray-600 mt-2">
              Your recently viewed or searched products
            </p>
          </div>
          {/* Optionally, you could add a "Clear" or "View All" button here */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockRecentSearchProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              imageUrl={product.imageUrl || "/images/picture-not-found.png"}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentSearchProducts;
