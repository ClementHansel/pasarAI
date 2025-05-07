"use client";
import React from "react";

interface NetProfitProps {
  revenue: number;
  expenses: number;
}

const NetProfit: React.FC<NetProfitProps> = ({ revenue, expenses }) => {
  const netProfit = revenue - expenses;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-2">Net Profit</h2>
      <p className="text-2xl font-semibold text-green-600">
        ${netProfit.toLocaleString()}
      </p>
    </div>
  );
};

export default NetProfit;
