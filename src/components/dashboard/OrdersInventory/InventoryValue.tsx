// src/components/dashboard/OrdersInventory/InventoryValue.tsx
"use client";
import React, { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const initialProducts: Product[] = [
  { id: 1, name: "Product A", price: 100, quantity: 50 },
  { id: 2, name: "Product B", price: 150, quantity: 30 },
  { id: 3, name: "Product C", price: 200, quantity: 20 },
];

const InventoryValue: React.FC = () => {
  const [inventoryValue, setInventoryValue] = useState<number>(0);

  useEffect(() => {
    // Simulate an API call to fetch inventory data
    setTimeout(() => {
      const value = initialProducts.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
      setInventoryValue(value);
    }, 2000);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h2 className="text-2xl font-bold mb-4">Inventory Value</h2>
      <p className="text-xl">${inventoryValue.toFixed(2)}</p>
    </div>
  );
};

export default InventoryValue;
