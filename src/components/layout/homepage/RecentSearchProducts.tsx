"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import SkeletonCard from "@/components/ui/SkeletonCard";

const PICTURE_NOT_FOUND = "/images/picture-not-found.png";

const mockRecentSearchProducts = [
  {
    id: "1",
    name: "Noise-Cancelling Headphones",
    price: 129.99,
    description: "Over-ear headphones for quiet listening.",
    imageUrls: ["/images/products/headphones.jpg"],
  },
  {
    id: "2",
    name: "Smart Fitness Tracker",
    price: 199.99,
    description: "Track steps, calories, and heart rate with ease.",
    imageUrls: ["/images/products/fitness_tracker.jpg"],
  },
  {
    id: "3",
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    description: "Water-resistant speaker for outdoor music.",
    imageUrls: ["/images/products/bluetooth_speaker.jpg"],
  },
];

const RecentSearchProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<typeof mockRecentSearchProducts>([]);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setProducts(mockRecentSearchProducts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
          <button className="mt-4 md:mt-0 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Clear History
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="transform transition-transform hover:scale-105"
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  description={product.description}
                  imageUrl={product.imageUrls?.[0] || PICTURE_NOT_FOUND}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentSearchProducts;
