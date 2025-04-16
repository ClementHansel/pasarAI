// src/components/layout/homepage/CategoryButtons.tsx

import React from "react";

const categories = [
  "Electronics",
  "Fashion",
  "Home",
  "Sports",
  "Automotive",
  "Books",
];

const CategoryButtons = () => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-4">
      {categories.map((category) => (
        <button
          key={category}
          className="bg-gray-100 px-4 py-2 rounded-full text-sm hover:bg-gray-200"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;
