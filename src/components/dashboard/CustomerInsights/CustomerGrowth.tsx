// src/components/dashboard/CustomerInsights/CustomerGrowth.tsx
import React, { useState, useEffect } from "react";

interface GrowthData {
  date: string;
  newCustomers: number;
}

const CustomerGrowth: React.FC = () => {
  const [data, setData] = useState<GrowthData[]>([]);

  useEffect(() => {
    // Mock fetching customer growth data (replace with real API call)
    const mockData: GrowthData[] = [
      { date: "2025-04-01", newCustomers: 100 },
      { date: "2025-04-02", newCustomers: 120 },
      { date: "2025-04-03", newCustomers: 130 },
    ];
    setData(mockData);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">Customer Growth</h2>
      <div className="mt-4">
        {data.map((item) => (
          <div key={item.date} className="flex justify-between p-2">
            <span>{item.date}</span>
            <span>{item.newCustomers} customers</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerGrowth;
