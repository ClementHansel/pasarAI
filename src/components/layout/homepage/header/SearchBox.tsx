// src/components/layout/homepage/header/SearchBox.tsx
import React from "react";
import { Search } from "lucide-react";

const SearchBox = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <input
        type="text"
        placeholder="Search for products, brands, and more..."
        className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
    </div>
  );
};

export default SearchBox;
