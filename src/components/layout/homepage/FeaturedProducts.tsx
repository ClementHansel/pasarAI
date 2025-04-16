"use client";

import React from "react";
import ProductCard from "@/components/market/ProductCard";

const mockFeaturedProducts = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 129.99,
    description: "Noise-cancelling over-ear headphones.",
    imageUrl: "/images/products/headphones.jpg",
  },
  {
    id: "2",
    name: "Smartwatch",
    price: 199.99,
    description: "Track your fitness and notifications on the go.",
    imageUrl: "/images/products/smartwatch.jpg",
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    price: 89.99,
    description: "Portable speaker with deep bass and clear sound.",
    imageUrl: "/images/products/speaker.jpg",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mockFeaturedProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
