// src/components/dashboard/CustomerInsights/CustomerAcquisitionCost.tsx

"use client";
import React, { useState, useEffect } from "react";

interface AcquisitionCostData {
  date: string;
  acquisitionCost: number;
}

const CustomerAcquisitionCost: React.FC = () => {
  const [data, setData] = useState<AcquisitionCostData[]>([]);

  useEffect(() => {
    // Mock fetching customer acquisition cost data (replace with real API call)
    const mockData: AcquisitionCostData[] = [
      { date: "2025-04-01", acquisitionCost: 50 },
      { date: "2025-04-02", acquisitionCost: 55 },
      { date: "2025-04-03", acquisitionCost: 60 },
    ];
    setData(mockData);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">
        Customer Acquisition Cost
      </h2>
      <div className="mt-4">
        {data.map((item) => (
          <div key={item.date} className="flex justify-between p-2">
            <span>{item.date}</span>
            <span>${item.acquisitionCost}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerAcquisitionCost;
