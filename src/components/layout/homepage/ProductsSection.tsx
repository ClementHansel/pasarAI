"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import SkeletonCard from "@/components/ui/SkeletonCard";
import { Category, Product } from "@/types/product";

const ITEMS_PER_PAGE = 8;
const PICTURE_NOT_FOUND = "/images/picture-not-found.png";

const now = new Date();

const mockCategories: Category[] = [
  {
    id: "1",
    name: "Headphones",
    description: "Various types of headphones",
    createdAt: now,
  },
  {
    id: "2",
    name: "Smart Watches",
    description: "Fitness tracking and smartwatches",
    createdAt: now,
  },
];

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    description: "Premium noise-cancelling over-ear headphones",
    brand: [
      {
        id: "1",
        name: "SoundPro",
        createdAt: now,
        updatedAt: now,
      },
    ],
    price: 129.99,
    originalPrice: 149.99,
    stock: 12,
    isAvailable: true,
    category: mockCategories[0], // Use the first mock category
    tags: ["electronics", "headphones"], // Example tags
    marketId: "soundpro-market", // Example market ID
    location: {
      region: "Asia",
      subregion: "Southeast Asia",
      city: "Jakarta",
    },
    currency: "USD",
    imageUrls: [PICTURE_NOT_FOUND], // Placeholder for image
    createdAt: now,
    updatedAt: now,
    rating: 4.8,
    reviews: [], // Empty array for now
    labels: [
      { name: "Best Seller", id: "bs1", createdAt: now, updatedAt: now },
    ],
    discount: 15, // 15% discount
    isFeatured: true, // Marked as featured product
    isActive: true, // Product is active
    accountId: "user123", // Example account ID
    marketType: "domestic", // Indicate that this is a domestic product
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    description: "Waterproof smartwatch with fitness tracking",
    brand: [
      {
        id: "2",
        name: "FitTech",
        createdAt: now,
        updatedAt: now,
      },
    ],
    price: 199.99,
    originalPrice: 219.99,
    stock: 20,
    isAvailable: true,
    category: mockCategories[1], // Use the second mock category
    tags: ["fitness", "smartwatch"], // Example tags
    marketId: "fittech-market", // Example market ID
    location: {
      region: "Asia",
      subregion: "Southeast Asia",
      city: "Jakarta",
    },
    currency: "USD",
    imageUrls: [PICTURE_NOT_FOUND], // Placeholder for image
    createdAt: now,
    updatedAt: now,
    rating: 4.5,
    reviews: [], // Empty array for now
    labels: [
      { name: "New Arrival", id: "na1", createdAt: now, updatedAt: now },
    ],
    discount: 10, // 10% discount
    isFeatured: false, // Not marked as featured
    isActive: true, // Product is active
    accountId: "user123", // Example account ID
    marketType: "domestic", // Indicate that this is a domestic product
  },
];

const ProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        const productList: Product[] =
          Array.isArray(data) && data.length > 0 ? data : mockProducts;

        setProducts(productList);
        setVisibleProducts(productList.slice(0, ITEMS_PER_PAGE));
        setHasMore(productList.length > ITEMS_PER_PAGE);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts(mockProducts);
        setVisibleProducts(mockProducts.slice(0, ITEMS_PER_PAGE));
        setHasMore(mockProducts.length > ITEMS_PER_PAGE);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const loadMore = () => {
    const newVisible = products.slice(
      visibleProducts.length,
      visibleProducts.length + ITEMS_PER_PAGE
    );
    setVisibleProducts((prev) => [...prev, ...newVisible]);
    setHasMore(visibleProducts.length + ITEMS_PER_PAGE < products.length);
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              All Products
            </h2>
            <p className="text-gray-600 mt-2">
              Browse our full collection of products
            </p>
          </div>
          <button className="mt-4 md:mt-0 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            View All Products
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {visibleProducts.map((product) => (
                <div
                  key={product.id}
                  className="transform transition-transform hover:scale-105"
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    imageUrl={product.imageUrls[0] || PICTURE_NOT_FOUND}
                    rating={product.rating}
                    discount={product.discount}
                    labels={product.labels.map((label) => ({
                      ...label,
                      createdAt: new Date(),
                      updatedAt: new Date(),
                    }))}
                  />
                </div>
              ))}
            </div>
            {hasMore && (
              <div className="mt-8 text-center">
                <button
                  onClick={loadMore}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Load More Products
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
