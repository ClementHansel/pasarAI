// src/components/dashboard/ShippingDelivery/DeliveryTimes.tsx
import React, { useState, useEffect } from "react";

const DeliveryTimes: React.FC = () => {
  const [averageDeliveryTime, setAverageDeliveryTime] = useState<number>(0);

  useEffect(() => {
    // Simulating fetching delivery time data (e.g., from API)
    setTimeout(() => {
      const deliveryTimes = [3, 4, 2, 5, 6]; // Delivery times in days
      const totalDeliveryTime = deliveryTimes.reduce(
        (acc, time) => acc + time,
        0
      );
      const avgTime = totalDeliveryTime / deliveryTimes.length;
      setAverageDeliveryTime(avgTime);
    }, 2000);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h2 className="text-2xl font-bold mb-4">Average Delivery Time</h2>
      <p className="text-xl">{averageDeliveryTime.toFixed(2)} days</p>
    </div>
  );
};

export default DeliveryTimes;
