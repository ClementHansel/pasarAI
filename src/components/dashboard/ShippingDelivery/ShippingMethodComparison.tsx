// src/components/dashboard/ShippingDelivery/ShippingMethodComparison.tsx
"use client";
import React, { useState, useEffect } from "react";

interface ShippingMethod {
  name: string;
  cost: number;
  deliveryTime: number; // in days
}

const ShippingMethodComparison: React.FC = () => {
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);

  useEffect(() => {
    // Simulating fetching shipping method comparison data
    setTimeout(() => {
      const methods: ShippingMethod[] = [
        { name: "Standard", cost: 5.0, deliveryTime: 5 },
        { name: "Express", cost: 15.0, deliveryTime: 2 },
        { name: "Next Day", cost: 25.0, deliveryTime: 1 },
      ];
      setShippingMethods(methods);
    }, 2000);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h2 className="text-2xl font-bold mb-4">Shipping Method Comparison</h2>
      <table className="min-w-full text-left table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Shipping Method</th>
            <th className="px-4 py-2 border">Cost ($)</th>
            <th className="px-4 py-2 border">Delivery Time (Days)</th>
          </tr>
        </thead>
        <tbody>
          {shippingMethods.map((method, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border">{method.name}</td>
              <td className="px-4 py-2 border">{method.cost}</td>
              <td className="px-4 py-2 border">{method.deliveryTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShippingMethodComparison;
