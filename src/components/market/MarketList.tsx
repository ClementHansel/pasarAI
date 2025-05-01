// src/components/market/MarketList.tsx
"use client";

import { Product } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { PackageOpen, Filter, ArrowUpDown } from "lucide-react";
import toast from "react-hot-toast";

export default function MarketList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"name" | "price" | "stock">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSort = (field: "name" | "price" | "stock") => {
    if (sortBy === field) {
      // Toggle sort order if clicking on the same field
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set new sort field and default to ascending
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    const factor = sortOrder === "asc" ? 1 : -1;

    switch (sortBy) {
      case "name":
        return factor * a.name.localeCompare(b.name);
      case "price":
        return factor * (a.price - b.price);
      case "stock":
        return factor * (a.stock - b.stock);
      default:
        return 0;
    }
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <PackageOpen className="mr-2 text-blue-600" size={24} />
          Product List
        </h2>

        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-500" />
          <span className="text-sm text-gray-500">Sort by:</span>
          <div className="flex bg-gray-100 rounded-lg overflow-hidden">
            {(["name", "price", "stock"] as const).map((field) => (
              <button
                key={field}
                onClick={() => handleSort(field)}
                className={`px-3 py-1 text-sm ${
                  sortBy === field
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
                {sortBy === field && (
                  <ArrowUpDown size={12} className="inline ml-1" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 p-4"
            >
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {product.description}
              </p>

              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <span className="text-xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-medium px-2 py-1 rounded-full ${
                      product.stock > 10
                        ? "bg-green-100 text-green-700"
                        : product.stock > 0
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">No products found</div>
      )}
    </div>
  );
}
