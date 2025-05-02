// src/components/dashboard/FinancialOverview/ProfitMargin.tsx
"use client";
import React, { useEffect, useState } from "react";

const ProfitMargin: React.FC = () => {
  const [margin, setMargin] = useState<number>(0);

  useEffect(() => {
    const revenue = 150000;
    const cost = 95000;
    const marginCalc = ((revenue - cost) / revenue) * 100;
    setMargin(parseFloat(marginCalc.toFixed(2)));
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-2">Profit Margin</h2>
      <p className="text-2xl font-semibold text-blue-600">{margin}%</p>
    </div>
  );
};

export default ProfitMargin;
