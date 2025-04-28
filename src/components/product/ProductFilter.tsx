// src\components\product\ProductFilter.tsx
"use client";

import { ChevronDown, LayoutList, LayoutGrid } from "lucide-react";
import { useState, useRef, useCallback } from "react";

export type ProductFilterProps = {
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onViewChange: (value: "list" | "grid") => void;
  currentViewMode: "list" | "grid";
};

const ProductFilter = ({
  onSearchChange,
  onCategoryChange,
  onViewChange,
  currentViewMode,
}: ProductFilterProps) => {
  const [localSearch, setLocalSearch] = useState("");
  const [category, setCategory] = useState("");

  // Debounce setup
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  const debouncedSearch = useCallback(
    (value: string) => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
      searchTimeout.current = setTimeout(() => {
        onSearchChange(value);
      }, 300); // Debounce delay
    },
    [onSearchChange]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    onCategoryChange(selectedCategory);
  };

  const handleViewChange = () => {
    onViewChange(currentViewMode === "list" ? "grid" : "list");
  };

  return (
    <div className="flex items-center gap-4 w-full">
      {/* Search Input */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search products..."
          value={localSearch}
          onChange={handleSearchChange}
          className="w-full pl-4 pr-8 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>

      {/* Category Dropdown */}
      <div className="relative">
        <select
          value={category}
          onChange={handleCategoryChange}
          aria-label="Product category"
          className="appearance-none pl-4 pr-8 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Categories</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Dairy">Dairy</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>

      {/* View Mode Toggle */}
      <div className="relative">
        <button
          onClick={handleViewChange}
          className="py-2 px-4 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {currentViewMode === "list" ? (
            <LayoutGrid className="w-5 h-5" />
          ) : (
            <LayoutList className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
