// src/components/dashboard/OrdersInventory/StockMovement.tsx
import React, { useState, useEffect } from "react";

interface Movement {
  id: number;
  productName: string;
  movementType: "Received" | "Sold" | "Returned";
  quantity: number;
  date: string;
}

const initialMovements: Movement[] = [
  {
    id: 1,
    productName: "Product A",
    movementType: "Received",
    quantity: 100,
    date: "2025-04-01",
  },
  {
    id: 2,
    productName: "Product B",
    movementType: "Sold",
    quantity: 50,
    date: "2025-04-02",
  },
  {
    id: 3,
    productName: "Product C",
    movementType: "Returned",
    quantity: 30,
    date: "2025-04-03",
  },
];

const StockMovement: React.FC = () => {
  const [movements, setMovements] = useState<Movement[]>(initialMovements);

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setMovements([
        {
          id: 1,
          productName: "Product A",
          movementType: "Received",
          quantity: 100,
          date: "2025-04-01",
        },
        {
          id: 2,
          productName: "Product B",
          movementType: "Sold",
          quantity: 50,
          date: "2025-04-02",
        },
        {
          id: 3,
          productName: "Product C",
          movementType: "Returned",
          quantity: 30,
          date: "2025-04-03",
        },
      ]);
    }, 2000);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h2 className="text-2xl font-bold mb-4">Stock Movement</h2>
      <ul>
        {movements.map((movement) => (
          <li key={movement.id} className="text-sm">
            {movement.productName} - {movement.movementType} -{" "}
            {movement.quantity} units on {movement.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockMovement;
