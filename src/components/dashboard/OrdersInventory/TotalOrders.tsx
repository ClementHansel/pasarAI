// src/components/dashboard/OrdersInventory/TotalOrders.tsx
import React, { useState, useEffect } from "react";

const TotalOrders: React.FC = () => {
  const [totalOrders, setTotalOrders] = useState<number>(0);

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setTotalOrders(245);
    }, 2000);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h2 className="text-2xl font-bold mb-4">Total Orders</h2>
      <p className="text-xl">{totalOrders}</p>
    </div>
  );
};

export default TotalOrders;
