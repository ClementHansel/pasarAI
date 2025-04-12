// src/components/dashboard/SalesPerformance/index.tsx
import React from "react";
import TotalSales from "./TotalSales";
import SalesTrends from "./SalesTrends";
import RevenuePerProduct from "./RevenuePerProduct";

const SalesPerformance = () => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <TotalSales />
      <SalesTrends />
      <RevenuePerProduct />
    </div>
  );
};

export default SalesPerformance;
