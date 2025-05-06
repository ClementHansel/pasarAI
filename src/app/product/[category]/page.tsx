// src/app/product/[categoryName]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/types/product";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!categoryName) return;

      try {
        setLoading(true);
        const res = await fetch(`/api/products?category=${categoryName}`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 capitalize">
        {categoryName} Products
      </h1>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length > 0 ? (
        <ul className="space-y-4">
          {products.map((product) => (
            <li key={product.id} className="border p-4 rounded shadow-sm">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="mt-2 font-medium">Price: ${product.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products available for this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
