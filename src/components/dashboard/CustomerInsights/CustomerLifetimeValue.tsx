// src/components/dashboard/CustomerInsights/CustomerLifetimeValue.tsx
"use client";

import React, { useState, useEffect } from "react";

interface LifetimeValueData {
  date: string;
  lifetimeValue: number;
}

const CustomerLifetimeValue: React.FC = () => {
  const [data, setData] = useState<LifetimeValueData[]>([]);

  useEffect(() => {
    // Mock fetching customer lifetime value data (replace with real API call)
    const mockData: LifetimeValueData[] = [
      { date: "2025-04-01", lifetimeValue: 150 },
      { date: "2025-04-02", lifetimeValue: 160 },
      { date: "2025-04-03", lifetimeValue: 170 },
    ];
    setData(mockData);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">
        Customer Lifetime Value
      </h2>
      <div className="mt-4">
        {data.map((item) => (
          <div key={item.date} className="flex justify-between p-2">
            <span>{item.date}</span>
            <span>${item.lifetimeValue}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerLifetimeValue;
