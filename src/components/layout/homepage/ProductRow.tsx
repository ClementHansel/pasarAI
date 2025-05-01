"use client";

import React from "react";
import ProductCard from "./ProductCard";
import { Label } from "@prisma/client";

interface ProductRowProps {
  title: string;
  products: Array<{
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrls: string[];
    rating?: number;
    discount?: number;
    labels?: Label[];
  }>;
}

const pictureNotFound = "/placeholder.png"; // fallback image path

const ProductRow: React.FC<ProductRowProps> = ({ title, products }) => {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex overflow-x-auto gap-4">
        {products.map((product) => {
          const {
            id,
            name,
            price,
            description,
            imageUrls,
            rating = 0,
            discount = 0,
            labels = [
              {
                id: "bestseller",
                name: "Bestseller",
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ],
          } = product;

          return (
            <ProductCard
              key={id}
              id={id}
              name={name}
              description={description}
              price={price}
              imageUrl={imageUrls?.[0] || pictureNotFound}
              rating={rating}
              discount={discount}
              labels={labels}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ProductRow;
