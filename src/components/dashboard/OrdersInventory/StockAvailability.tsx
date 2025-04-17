// src/components/dashboard/OrdersInventory/StockAvailability.tsx
"use client";
import React, { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  availableStock: number;
}

const initialProducts: Product[] = [
  { id: 1, name: "Product A", availableStock: 100 },
  { id: 2, name: "Product B", availableStock: 0 },
  { id: 3, name: "Product C", availableStock: 50 },
];

const StockAvailability: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setProducts([
        { id: 1, name: "Product A", availableStock: 100 },
        { id: 2, name: "Product B", availableStock: 0 },
        { id: 3, name: "Product C", availableStock: 50 },
      ]);
    }, 2000);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h2 className="text-2xl font-bold mb-4">Stock Availability</h2>
      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            className={`text-sm ${
              product.availableStock === 0 ? "text-red-600" : "text-green-600"
            }`}
          >
            {product.name} -{" "}
            {product.availableStock === 0
              ? "Out of Stock"
              : `${product.availableStock} units available`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockAvailability;
