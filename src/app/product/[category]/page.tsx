"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/types/product";

const CategoryPage = () => {
  const params = useParams();
  const categoryName = decodeURIComponent(params.category as string);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!categoryName) return;

      try {
        setLoading(true);
        const res = await fetch(
          `/api/products?category=${encodeURIComponent(categoryName)}`
        );
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
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
        <p className="text-gray-600">Loading products...</p>
      ) : products.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <li key={product.id} className="border p-4 rounded shadow-sm">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="mt-2 font-medium text-primary">
                Price: ${product.price}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">
          No products available for this category.
        </p>
      )}
    </div>
  );
};

export default CategoryPage;
