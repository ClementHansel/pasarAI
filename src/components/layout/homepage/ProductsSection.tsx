// src/components/layout/homepage/ProductsSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types/product";
import SkeletonCard from "@/components/ui/SkeletonCard";

const PICTURE_NOT_FOUND = "/images/picture-not-found.png";

// Fallback mock data for when API returns no products
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Organic Apple",
    price: 2.99,
    originalPrice: 2.99,
    description: "Fresh organic apples from local farms.",
    imageUrls: [],
    labels: [{ name: "Best Seller", id: "bs" }],
    discount: undefined,
    stock: 100,
    isAvailable: true,
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    rating: 4.5,
    reviews: [],
    brand: [],
  },
  {
    id: 2,
    name: "Carrot",
    price: 1.5,
    originalPrice: 1.5,
    description: "Sweet and crunchy carrots.",
    imageUrls: [],
    labels: [{ name: "New Arrival", id: "na" }],
    discount: undefined,
    stock: 50,
    isAvailable: true,
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    rating: 4.0,
    reviews: [],
    brand: [],
  },
];

interface ProductsSectionProps {}

const ProductsSection: React.FC<ProductsSectionProps> = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        const list: Product[] = Array.isArray(data)
          ? data
          : Array.isArray(data.products)
          ? data.products
          : [];
        setProducts(list);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Use fetched data or fallback mocks
  const safeProducts =
    !loading && products.length > 0 ? products : mockProducts;

  // Pick one item per label
  const newArrival = safeProducts.find((p) =>
    p.labels?.some((l) => l.name === "New Arrival")
  );
  const bestSeller = safeProducts.find((p) =>
    p.labels?.some((l) => l.name === "Best Seller")
  );

  const items = [
    { label: "New Arrival", product: newArrival },
    { label: "Best Seller", product: bestSeller },
  ];

  return (
    <section className="py-12 px-4 max-w-[1200px] mx-auto">
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map(({ label, product }) => (
            <div
              key={label}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center"
            >
              <h2 className="text-xl font-bold mb-4">{label}</h2>
              {product ? (
                <ProductCard
                  id={product.id.toString()}
                  name={product.name}
                  price={product.price}
                  description={product.description}
                  imageUrl={product.imageUrls[0] || PICTURE_NOT_FOUND}
                  discount={product.discount}
                  badgeText={label}
                />
              ) : (
                <p className="text-gray-400">No product available</p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductsSection;
