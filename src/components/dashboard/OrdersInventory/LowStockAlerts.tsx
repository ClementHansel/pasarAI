// src/components/dashboard/OrdersInventory/LowStockAlerts.tsx
"use client";
import React, { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  stock: number;
}

const initialProducts: Product[] = [
  { id: 1, name: "Product A", stock: 5 },
  { id: 2, name: "Product B", stock: 2 },
  { id: 3, name: "Product C", stock: 8 },
  { id: 4, name: "Product D", stock: 1 },
];

const LowStockAlerts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    // Simulate fetching data from an API or database
    setTimeout(() => {
      setProducts([
        { id: 1, name: "Product A", stock: 5 },
        { id: 2, name: "Product B", stock: 2 },
        { id: 3, name: "Product C", stock: 8 },
        { id: 4, name: "Product D", stock: 1 },
      ]);
    }, 2000);
  }, []);

  const lowStockProducts = products.filter((product) => product.stock <= 3);

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h2 className="text-2xl font-bold mb-4">Low Stock Alerts</h2>
      <ul>
        {lowStockProducts.length > 0 ? (
          lowStockProducts.map((product) => (
            <li key={product.id} className="text-sm text-red-600">
              {product.name} - {product.stock} left
            </li>
          ))
        ) : (
          <li className="text-sm text-green-600">
            All products are well-stocked.
          </li>
        )}
      </ul>
    </div>
  );
};

export default LowStockAlerts;
