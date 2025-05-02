// src/components/dashboard/OrdersInventory/TopSellingProducts.tsx
"use client";
import React, { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  salesCount: number;
}

const initialTopProducts: Product[] = [
  { id: 1, name: "Product A", salesCount: 500 },
  { id: 2, name: "Product B", salesCount: 300 },
  { id: 3, name: "Product C", salesCount: 200 },
];

const TopSellingProducts: React.FC = () => {
  const [topProducts, setTopProducts] = useState<Product[]>(initialTopProducts);

  useEffect(() => {
    // Simulate fetching data from an API
    setTimeout(() => {
      setTopProducts([
        { id: 1, name: "Product A", salesCount: 500 },
        { id: 2, name: "Product B", salesCount: 300 },
        { id: 3, name: "Product C", salesCount: 200 },
      ]);
    }, 2000);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h2 className="text-2xl font-bold mb-4">Top Selling Products</h2>
      <ul>
        {topProducts.map((product) => (
          <li key={product.id} className="text-sm">
            {product.name} - {product.salesCount} units sold
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSellingProducts;
