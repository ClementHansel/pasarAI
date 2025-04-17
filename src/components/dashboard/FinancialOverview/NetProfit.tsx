// src/components/dashboard/FinancialOverview/NetProfit.tsx
"use client";
import React, { useEffect, useState } from "react";

const NetProfit: React.FC = () => {
  const [netProfit, setNetProfit] = useState<number>(0);

  useEffect(() => {
    // Mock calculation logic
    const revenue = 150000;
    const expenses = 95000;
    setNetProfit(revenue - expenses);
  }, []);

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
