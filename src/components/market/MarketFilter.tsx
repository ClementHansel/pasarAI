// src/components/market/MarketFilter.tsx
"use client";
import { Search } from "lucide-react";
import React, { useState } from "react";

interface MarketFilterProps {
  onSearch: (query: string) => void;
  placeholder: string;
}

export const MarketFilter: React.FC<MarketFilterProps> = ({
  onSearch,
  placeholder,
}) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={18}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      />
    </div>
  );
};
