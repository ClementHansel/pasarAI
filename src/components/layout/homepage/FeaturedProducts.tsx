import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

const pictureNotFound = "/images/picture-not-found.png";

const mockFeaturedProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    price: 129.99,
    originalPrice: 159.99,
    description:
      "Premium noise-cancelling over-ear headphones with 40-hour battery life.",
    imageUrls: [],
    rating: 4.8,
    discount: 15,
    stock: 50,
    isAvailable: true,
    labels: [
      { name: "New", id: "new", createdAt: new Date(), updatedAt: new Date() },
    ],
    brand: [
      { id: 1, name: "Brand A", createdAt: new Date(), updatedAt: new Date() },
    ],
    tags: ["electronics", "headphones"],
    marketId: "market1",
    currency: "USD",
    accountId: "account1",
    marketType: "domestic",
    createdAt: new Date(),
    updatedAt: new Date(),
    location: { region: "North America", subregion: "US", city: "New York" },
    lastSoldAt: null,
    reviews: [],
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 199.99,
    originalPrice: 249.99,
    description:
      "Track your fitness, sleep, and notifications with this waterproof smartwatch.",
    imageUrls: [],
    rating: 4.5,
    labels: [
      { name: "New", id: "new", createdAt: new Date(), updatedAt: new Date() },
    ],
    stock: 150,
    isAvailable: true,
    brand: [
      { id: 2, name: "Brand B", createdAt: new Date(), updatedAt: new Date() },
    ],
    tags: ["electronics", "smartwatch"],
    marketId: "market2",
    currency: "USD",
    accountId: "account2",
    marketType: "global",
    createdAt: new Date(),
    updatedAt: new Date(),
    location: { region: "Europe", subregion: "UK", city: "London" },
    lastSoldAt: null,
    reviews: [],
  },
  {
    id: "3",
    name: "Portable Bluetooth Speaker",
    price: 89.99,
    originalPrice: 99.99,
    description:
      "Portable speaker with 360° sound, deep bass and 24-hour playtime.",
    imageUrls: [],
    rating: 4.2,
    discount: 10,
    stock: 100,
    isAvailable: true,
    labels: [
      { name: "New", id: "new", createdAt: new Date(), updatedAt: new Date() },
    ],
    brand: [
      { id: 3, name: "Brand C", createdAt: new Date(), updatedAt: new Date() },
    ],
    tags: ["electronics", "speaker"],
    marketId: "market3",
    currency: "USD",
    accountId: "account3",
    marketType: "domestic",
    createdAt: new Date(),
    updatedAt: new Date(),
    location: {
      region: "North America",
      subregion: "US",
      city: "San Francisco",
    },
    lastSoldAt: null,
    reviews: [],
  },
  {
    id: "4",
    name: "Ultra-thin Laptop",
    price: 899.99,
    originalPrice: 999.99,
    description:
      "Lightweight laptop with 16GB RAM, 512GB SSD and all-day battery life.",
    imageUrls: [],
    rating: 4.7,
    discount: 10,
    stock: 50,
    isAvailable: true,
    labels: [
      {
        name: "Bestseller",
        id: "bestseller",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    brand: [
      { id: 4, name: "Brand D", createdAt: new Date(), updatedAt: new Date() },
    ],
    tags: ["electronics", "laptop"],
    marketId: "market4",
    currency: "USD",
    accountId: "account4",
    marketType: "global",
    createdAt: new Date(),
    updatedAt: new Date(),
    location: { region: "Europe", subregion: "Germany", city: "Berlin" },
    lastSoldAt: null,
    reviews: [],
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
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                imageUrl={product.imageUrls[0] || pictureNotFound}
                rating={product.rating}
                discount={product.discount}
                labels={[
                  {
                    id: "bestseller",
                    name: "Bestseller",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  },
                ]}
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
