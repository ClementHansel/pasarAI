"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

interface ProductFilterProps {
  onSearch: (search: string) => void;
  onCategoryChange: (category: string) => void;
  onPriceChange: (min: number, max: number) => void;
  onStockChange: (inStock: boolean) => void;
  onSortChange: (sortBy: string) => void;
}

const ProductFilter = ({
  onSearch,
  onCategoryChange,
  onPriceChange,
  onStockChange,
  onSortChange,
}: ProductFilterProps) => {
  const [localSearch, setLocalSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStock, setInStock] = useState(false);
  const [sortBy, setSortBy] = useState("");

  // Maintain existing search debounce logic
  useEffect(() => {
    const timeout = setTimeout(() => onSearch(localSearch), 300);
    return () => clearTimeout(timeout);
  }, [localSearch, onSearch]);

  // Handle price range changes
  useEffect(() => {
    onPriceChange(Number(minPrice), Number(maxPrice));
  }, [minPrice, maxPrice, onPriceChange]);

  // Handle stock filter changes
  useEffect(() => {
    onStockChange(inStock);
  }, [inStock, onStockChange]);

  // Handle sorting changes
  useEffect(() => {
    onSortChange(sortBy);
  }, [sortBy, onSortChange]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="w-full pl-4 pr-8 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>

      {/* Category Filter */}
      <div className="relative">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            onCategoryChange(e.target.value);
          }}
          className="w-full appearance-none pl-4 pr-8 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-1/2 pl-4 pr-2 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-1/2 pl-4 pr-2 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Stock Filter */}
      <div className="flex items-center gap-2 pl-4">
        <input
          type="checkbox"
          id="stockFilter"
          checked={inStock}
          onChange={(e) => setInStock(e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="stockFilter" className="text-sm text-gray-700">
          In Stock Only
        </label>
      </div>

      {/* Sort Filter */}
      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full appearance-none pl-4 pr-8 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="name_asc">Name: A-Z</option>
          <option value="name_desc">Name: Z-A</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};

export default ProductFilter;
