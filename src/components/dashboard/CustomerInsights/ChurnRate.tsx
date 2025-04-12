// src/components/dashboard/CustomerInsights/ChurnRate.tsx
import React, { useState, useEffect } from "react";

interface ChurnRateData {
  date: string;
  churnRate: number;
}

const ChurnRate: React.FC = () => {
  const [data, setData] = useState<ChurnRateData[]>([]);

  useEffect(() => {
    // Mock fetching churn rate data (replace with real API call)
    const mockData: ChurnRateData[] = [
      { date: "2025-04-01", churnRate: 5.0 },
      { date: "2025-04-02", churnRate: 4.8 },
      { date: "2025-04-03", churnRate: 5.2 },
    ];
    setData(mockData);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">Churn Rate</h2>
      <div className="mt-4">
        {data.map((item) => (
          <div key={item.date} className="flex justify-between p-2">
            <span>{item.date}</span>
            <span>{item.churnRate}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChurnRate;
