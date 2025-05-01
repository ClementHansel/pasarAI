"use client";

import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import type { ProductFilterInput } from "@/types/product";

interface ProductFilterProps {
  value: ProductFilterInput;
  onFilterChange: (filters: ProductFilterInput) => void;
}

const ProductFilter = ({ value, onFilterChange }: ProductFilterProps) => {
  // Local state mirrors the filter input
  const [local, setLocal] = useState<ProductFilterInput>(value);

  // Keep local state in sync with parent value
  useEffect(() => {
    setLocal(value);
  }, [value]);

  // Notify parent on any local change
  useEffect(() => {
    onFilterChange(local);
  }, [local, onFilterChange]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={local.search || ""}
          onChange={(e) => setLocal((l) => ({ ...l, search: e.target.value }))}
          className="w-full pl-4 pr-8 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
      {/* Category Filter */}
      <div className="relative">
        <select
          value={local.categoryId || ""}
          onChange={(e) =>
            setLocal((l) => ({ ...l, categoryId: e.target.value }))
          }
          className="w-full appearance-none pl-4 pr-8 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          aria-label="Select Category"
        >
          <option value="">All Categories</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Dairy">Dairy</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
      {/* Price Range Filter */}
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Min price"
          value={local.minPrice ?? ""}
          onChange={(e) =>
            setLocal((l) => ({
              ...l,
              minPrice: e.target.value ? Number(e.target.value) : undefined,
            }))
          }
          className="w-1/2 pl-4 pr-2 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="number"
          placeholder="Max price"
          value={local.maxPrice ?? ""}
          onChange={(e) =>
            setLocal((l) => ({
              ...l,
              maxPrice: e.target.value ? Number(e.target.value) : undefined,
            }))
          }
          className="w-1/2 pl-4 pr-2 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      {/* Stock Filter */}
      <div className="flex items-center gap-2 pl-4">
        <input
          type="checkbox"
          id="stockFilter"
          checked={!!local.inStock}
          onChange={(e) =>
            setLocal((l) => ({ ...l, inStock: e.target.checked }))
          }
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="stockFilter" className="text-sm text-gray-700">
          In Stock Only
        </label>
      </div>
      {/* Sort Filter */}
      <div className="relative">
        <select
          value={local.sortBy || ""}
          onChange={(e) =>
            setLocal((l) => ({
              ...l,
              sortBy: e.target.value as ProductFilterInput["sortBy"],
            }))
          }
          className="w-full appearance-none pl-4 pr-8 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          aria-label="Sort By"
        >
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Rating</option>
          <option value="newest">Newest</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};

export default ProductFilter;
