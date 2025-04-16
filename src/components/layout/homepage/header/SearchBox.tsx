// src/components/layout/homepage/header/SearchBox.tsx

import React from "react";
import { Search } from "lucide-react";

const SearchBox = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for products, brands, and more..."
        className="w-full rounded-full border border-gray-300 px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
    </div>
  );
};

export default SearchBox;
