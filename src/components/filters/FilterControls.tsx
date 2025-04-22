// src/components/filters/FilterControls.tsx

import React, { useState } from "react";

interface FilterControlsProps {
  onFilterChange: (filters: { dateRange: string; category: string }) => void;
}

export default function FilterControls({
  onFilterChange,
}: FilterControlsProps) {
  const [dateRange, setDateRange] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const handleFilterChange = () => {
    onFilterChange({ dateRange, category });
  };

  return (
    <div className="flex gap-4 items-center">
      <div>
        <label
          htmlFor="dateRange"
          className="block text-sm font-medium text-gray-600"
        >
          Date Range
        </label>
        <input
          type="date"
          id="dateRange"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-600"
        >
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded"
        >
          <option value="">Select Category</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Operations">Operations</option>
        </select>
      </div>

      <button
        onClick={handleFilterChange}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Apply Filters
      </button>
    </div>
  );
}
