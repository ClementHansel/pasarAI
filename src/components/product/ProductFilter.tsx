// src/components/product/ProductFilter.tsx
import { useState } from "react";

interface ProductFilterProps {
  onSearch: (search: string) => void;
  onCategoryChange: (category: string) => void;
}

const ProductFilter = ({ onSearch, onCategoryChange }: ProductFilterProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
    onCategoryChange(event.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-6">
      <input
        type="text"
        placeholder="Search products"
        value={searchTerm}
        onChange={handleSearchChange}
        className="border rounded px-4 py-2 w-full sm:w-64"
      />
      <select
        value={category}
        onChange={handleCategoryChange}
        className="border rounded px-4 py-2 w-full sm:w-64"
        aria-label="Filter by category"
      >
        <option value="">All Categories</option>
        <option value="Vegetables">Vegetables</option>
        <option value="Fruits">Fruits</option>
        <option value="Dairy">Dairy</option>
        {/* Add more categories as needed */}
      </select>
    </div>
  );
};

export default ProductFilter;
