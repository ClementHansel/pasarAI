"use client";
import React from "react";

interface ProfitMarginProps {
  revenue: number;
  cost: number;
}

const ProfitMargin: React.FC<ProfitMarginProps> = ({ revenue, cost }) => {
  const margin = ((revenue - cost) / revenue) * 100;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-2">Profit Margin</h2>
      <p className="text-2xl font-semibold text-blue-600">
        {margin.toFixed(2)}%
      </p>
    </div>
  );
};

export default ProfitMargin;
