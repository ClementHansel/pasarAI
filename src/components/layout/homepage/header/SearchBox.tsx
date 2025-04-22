// src/components/layout/homepage/header/SearchBox.tsx

import React, { useState } from "react";
import { Search } from "lucide-react";

const categories = [
  "All Categories",
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports",
  "Books",
  "Toys",
];

const SearchBox = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  return (
    <div className="relative flex w-full">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search for products, brands, and more..."
          className="w-full rounded-l-full border border-r-0 border-gray-300 px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
      </div>

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="rounded-r-full border border-l-0 border-gray-300 bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBox;
