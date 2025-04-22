// src/components/dashboard/OrdersInventory/InventoryTurnover.tsx
"use client";
import React, { useState, useEffect } from "react";

const InventoryTurnover: React.FC = () => {
  const [turnoverRate, setTurnoverRate] = useState<number>(0);

  useEffect(() => {
    // Simulate an API call to fetch turnover rate data
    setTimeout(() => {
      const sales = 1200; // Example sales value
      const averageInventory = 300; // Example average inventory value
      const turnover = sales / averageInventory;
      setTurnoverRate(turnover);
    }, 2000);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h2 className="text-2xl font-bold mb-4">Inventory Turnover</h2>
      <p className="text-xl">{turnoverRate.toFixed(2)}</p>
    </div>
  );
};

export default InventoryTurnover;
