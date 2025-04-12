// src/components/customization/DashboardLayout.tsx

import React from "react";
import FilterControls from "@/components/filters/FilterControls";
import CustomBarChart from "@/components/charts/BarChart";
import CustomLineChart from "@/components/charts/LineChart";

const mockData = [
  { name: "Jan", value: 30 },
  { name: "Feb", value: 40 },
  { name: "Mar", value: 35 },
  { name: "Apr", value: 50 },
];

export default function DashboardLayout() {
  const handleFilterChange = (filters: {
    dateRange: string;
    category: string;
  }) => {
    console.log(filters);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <FilterControls onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-2 gap-4 mt-6">
        <CustomBarChart data={mockData} />
        <CustomLineChart data={mockData} />
      </div>
    </div>
  );
}
