// src/components/product/ProductFilter.tsx
"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

interface ProductFilterProps {
  onSearch: (search: string) => void;
  onCategoryChange: (category: string) => void;
}

const ProductFilter = ({ onSearch, onCategoryChange }: ProductFilterProps) => {
  const [localSearch, setLocalSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => onSearch(localSearch), 300);
    return () => clearTimeout(timeout);
  }, [localSearch]);

  return (
    <div className="flex items-center gap-4 w-full">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search products..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="w-full pl-4 pr-8 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>

      <div className="relative">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            onCategoryChange(e.target.value);
          }}
          className="appearance-none pl-4 pr-8 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Categories</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Dairy">Dairy</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};

export default ProductFilter;
