"use client";
import RevenuePerProduct from "@/components/dashboard/analyticals/SalesPerformance/RevenuePerProduct";
import SalesTrends from "@/components/dashboard/analyticals/SalesPerformance/SalesTrends";
import TotalSales from "@/components/dashboard/analyticals/SalesPerformance/TotalSales";
import { RouteGuard } from "@/components/auth/RouteGuard";

export default function SalesPerformancePage() {
  return (
    <RouteGuard allowedRoles={["SELLER"]}>
      <div className="space-y-6 p-4">
        <h1 className="text-2xl font-bold">📊 Sales Performance</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <TotalSales />
          <SalesTrends />
          <RevenuePerProduct />
        </div>
      </div>
    </RouteGuard>
  );
}
