import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

const pictureNotFound = "/images/picture-not-found.png";
// Enhanced mock data with better images and more details
const mockFeaturedProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    price: 129.99,
    description:
      "Premium noise-cancelling over-ear headphones with 40-hour battery life.",
    imageUrl: null,
    rating: 4.8,
    discount: 15,
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 199.99,
    description:
      "Track your fitness, sleep, and notifications with this waterproof smartwatch.",
    imageUrl: null,
    rating: 4.5,
    labels: { name: "New", id: "new" },
  },
  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    price: 89.99,
    description:
      "Portable speaker with 360° sound, deep bass and 24-hour playtime.",
    imageUrl: null,
    rating: 4.2,
    discount: 10,
  },
  {
    id: 4,
    name: "Ultra-thin Laptop",
    price: 899.99,
    description:
      "Lightweight laptop with 16GB RAM, 512GB SSD and all-day battery life.",
    imageUrl: null,
    rating: 4.7,
    labels: { name: "Bestseller", id: "bestseller" },
  },
];

const FeaturedProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<typeof mockFeaturedProducts>([]);

  // Simulate fetching products
  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(mockFeaturedProducts);
      setLoading(false);
    }, 1000); // Simulate loading delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-12 px-4 ">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              Featured Products
            </h2>
            <p className="text-gray-600 mt-2">
              Discover our most popular and trending items
            </p>
          </div>

          <button className="mt-4 md:mt-0 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            View All
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                imageUrl={product.imageUrl || pictureNotFound}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// Skeleton loader for product cards
const ProductCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full animate-pulse">
    <div className="aspect-square bg-gray-200"></div>
    <div className="p-5">
      <div className="h-6 bg-gray-200 rounded-md mb-2"></div>
      <div className="h-4 bg-gray-200 rounded-md w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-4"></div>
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-gray-200 rounded-full"></div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="h-6 bg-gray-200 rounded-md w-20"></div>
        <div className="h-10 bg-gray-200 rounded-lg w-24"></div>
      </div>
    </div>
  </div>
);

export default FeaturedProducts;
