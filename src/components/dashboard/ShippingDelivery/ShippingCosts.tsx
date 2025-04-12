// src/components/dashboard/ShippingDelivery/ShippingCosts.tsx
import React, { useState, useEffect } from "react";

const ShippingCosts: React.FC = () => {
  const [shippingCost, setShippingCost] = useState<number>(0);

  useEffect(() => {
    // Simulating shipping cost fetching
    setTimeout(() => {
      const costs = [15.5, 20.0, 18.75, 22.5]; // Example shipping costs in USD
      const totalCost = costs.reduce((acc, cost) => acc + cost, 0);
      setShippingCost(totalCost);
    }, 2000);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h2 className="text-2xl font-bold mb-4">Total Shipping Costs</h2>
      <p className="text-xl">${shippingCost.toFixed(2)}</p>
    </div>
  );
};

export default ShippingCosts;
