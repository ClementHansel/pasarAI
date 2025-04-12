// src/components/dashboard/CustomerInsights/CustomerRetention.tsx
import React, { useState, useEffect } from "react";

interface RetentionData {
  date: string;
  retentionRate: number;
}

const CustomerRetention: React.FC = () => {
  const [data, setData] = useState<RetentionData[]>([]);

  useEffect(() => {
    // Mock fetching customer retention data (replace with real API call)
    const mockData: RetentionData[] = [
      { date: "2025-04-01", retentionRate: 75 },
      { date: "2025-04-02", retentionRate: 78 },
      { date: "2025-04-03", retentionRate: 77 },
    ];
    setData(mockData);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">Customer Retention</h2>
      <div className="mt-4">
        {data.map((item) => (
          <div key={item.date} className="flex justify-between p-2">
            <span>{item.date}</span>
            <span>{item.retentionRate}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerRetention;
