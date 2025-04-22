// src/components/dashboard/ShippingDelivery/ShippingPerformance.tsx
"use client";
import React, { useState, useEffect } from "react";

const ShippingPerformance: React.FC = () => {
  const [onTimeDeliveryRate, setOnTimeDeliveryRate] = useState<number>(0);

  useEffect(() => {
    // Simulating fetching shipping performance data
    setTimeout(() => {
      const deliveredOnTime = 80; // 80 orders delivered on time
      const totalOrders = 100; // Total orders shipped
      const rate = (deliveredOnTime / totalOrders) * 100;
      setOnTimeDeliveryRate(rate);
    }, 2000);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h2 className="text-2xl font-bold mb-4">Shipping Performance</h2>
      <p className="text-xl">
        {onTimeDeliveryRate.toFixed(2)}% on-time delivery
      </p>
    </div>
  );
};

export default ShippingPerformance;
