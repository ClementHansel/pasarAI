"use client";
import RevenuePerProduct from "@/components/dashboard/SalesPerformance/RevenuePerProduct";
import SalesTrends from "@/components/dashboard/SalesPerformance/SalesTrends";
import TotalSales from "@/components/dashboard/SalesPerformance/TotalSales";

export default function SalesPerformancePage() {
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">📊 Sales Performance</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <TotalSales />
        <SalesTrends />
        <RevenuePerProduct />
      </div>
    </div>
  );
}
