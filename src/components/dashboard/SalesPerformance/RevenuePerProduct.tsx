// src/components/dashboard/SalesPerformance/RevenuePerProduct.tsx
"use client";
import React, { useEffect, useState } from "react";

// Define a type for the revenue data
interface RevenueData {
  productName: string;
  revenue: number;
}

// Example product revenue data, replace with real data later
const fetchRevenuePerProduct = (): RevenueData[] => {
  return [
    { productName: "Product A", revenue: 30000 },
    { productName: "Product B", revenue: 25000 },
    { productName: "Product C", revenue: 50000 },
  ];
};

const RevenuePerProduct = () => {
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);

  useEffect(() => {
    const data = fetchRevenuePerProduct();
    setRevenueData(data);
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">Revenue Per Product</h3>
      <div className="mt-4">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Product</th>
              <th className="px-4 py-2 text-left">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {revenueData.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{item.productName}</td>
                <td className="px-4 py-2">${item.revenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenuePerProduct;
