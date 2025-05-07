// src/components/dashboard/OrdersInventory/BackorderedItems.tsx
"use client";
import React, { useState, useEffect } from "react";

interface Backorder {
  id: number;
  productName: string;
  backorderedQuantity: number;
  expectedRestockDate: string;
}

const initialBackorders: Backorder[] = [
  {
    id: 1,
    productName: "Product A",
    backorderedQuantity: 50,
    expectedRestockDate: "2025-04-15",
  },
  {
    id: 2,
    productName: "Product B",
    backorderedQuantity: 30,
    expectedRestockDate: "2025-04-18",
  },
];

const BackorderedItems: React.FC = () => {
  const [backorders, setBackorders] = useState<Backorder[]>(initialBackorders);

  useEffect(() => {
    // Simulate fetching data from an API
    setTimeout(() => {
      setBackorders([
        {
          id: 1,
          productName: "Product A",
          backorderedQuantity: 50,
          expectedRestockDate: "2025-04-15",
        },
        {
          id: 2,
          productName: "Product B",
          backorderedQuantity: 30,
          expectedRestockDate: "2025-04-18",
        },
      ]);
    }, 2000);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h2 className="text-2xl font-bold mb-4">Backordered Items</h2>
      <ul>
        {backorders.map((backorder) => (
          <li key={backorder.id} className="text-sm">
            {backorder.productName} - {backorder.backorderedQuantity} units
            (Restock on {backorder.expectedRestockDate})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BackorderedItems;
