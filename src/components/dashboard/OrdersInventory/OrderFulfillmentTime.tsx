// src/components/dashboard/OrdersInventory/OrderFulfillmentTime.tsx
import React, { useState, useEffect } from "react";

const OrderFulfillmentTime: React.FC = () => {
  const [fulfillmentTime, setFulfillmentTime] = useState<number>(0);

  useEffect(() => {
    // Simulate fetching data (e.g., from API)
    setTimeout(() => {
      const orderReceivedTime = new Date("2025-04-01T09:00:00").getTime();
      const orderShippedTime = new Date("2025-04-01T15:00:00").getTime();

      const timeToFulfill =
        (orderShippedTime - orderReceivedTime) / (1000 * 3600); // Time in hours
      setFulfillmentTime(timeToFulfill);
    }, 2000);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h2 className="text-2xl font-bold mb-4">Order Fulfillment Time</h2>
      <p className="text-xl">{fulfillmentTime.toFixed(2)} hours</p>
    </div>
  );
};

export default OrderFulfillmentTime;
