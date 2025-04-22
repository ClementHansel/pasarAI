// src/components/market/MarketFilter.tsx
"use client";

import { useState } from "react";

interface MarketFilterProps {
  onSearch: (query: string) => void;
}

export const MarketFilter = ({ onSearch }: MarketFilterProps) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search sellers..."
        value={query}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
      />
    </div>
  );
};
