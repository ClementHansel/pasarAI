// src/components/layout/homepage/ProductRow.tsx

"use client";

import React from "react";
import ProductCard from "@/components/market/ProductCard";

interface ProductRowProps {
  title: string;
  products: Array<{
    id: number; // Keep id as number here
    name: string;
    price: number;
    description: string;
    imageUrls: string[];
    labels?: { name: string; id: string };
  }>;
}

const ProductRow: React.FC<ProductRowProps> = ({ title, products }) => {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex overflow-x-auto gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id.toString()} // Convert id to string here
            name={product.name}
            price={product.price}
            description={product.description}
            imageUrl={product.imageUrls[0]} // Use the first image in imageUrls
            labels={product.labels}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductRow;
