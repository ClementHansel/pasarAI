// src/components/dashboard/ShippingDelivery/ShippingProviderPerformance.tsx
"use client";
import React, { useState, useEffect } from "react";

interface ShippingProvider {
  name: string;
  onTimeDeliveryRate: number; // percentage
  avgDeliveryTime: number; // in days
  avgCost: number; // in USD
}

const ShippingProviderPerformance: React.FC = () => {
  const [providers, setProviders] = useState<ShippingProvider[]>([]);

  useEffect(() => {
    // Simulating fetching data about shipping provider performance
    setTimeout(() => {
      const providerData: ShippingProvider[] = [
        {
          name: "FedEx",
          onTimeDeliveryRate: 95,
          avgDeliveryTime: 3,
          avgCost: 15,
        },
        {
          name: "UPS",
          onTimeDeliveryRate: 97,
          avgDeliveryTime: 2,
          avgCost: 12,
        },
        {
          name: "DHL",
          onTimeDeliveryRate: 90,
          avgDeliveryTime: 4,
          avgCost: 18,
        },
      ];
      setProviders(providerData);
    }, 2000);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h2 className="text-2xl font-bold mb-4">Shipping Provider Performance</h2>
      <table className="min-w-full text-left table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Provider</th>
            <th className="px-4 py-2 border">On-time Delivery Rate (%)</th>
            <th className="px-4 py-2 border">Avg. Delivery Time (Days)</th>
            <th className="px-4 py-2 border">Avg. Shipping Cost ($)</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((provider, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border">{provider.name}</td>
              <td className="px-4 py-2 border">
                {provider.onTimeDeliveryRate}
              </td>
              <td className="px-4 py-2 border">{provider.avgDeliveryTime}</td>
              <td className="px-4 py-2 border">{provider.avgCost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShippingProviderPerformance;
