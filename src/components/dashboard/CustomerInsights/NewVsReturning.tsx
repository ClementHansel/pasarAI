// src/components/dashboard/CustomerInsights/NewVsReturning.tsx
import React, { useState, useEffect } from "react";

interface NewVsReturningData {
  date: string;
  newCustomers: number;
  returningCustomers: number;
}

const NewVsReturning: React.FC = () => {
  const [data, setData] = useState<NewVsReturningData[]>([]);

  useEffect(() => {
    // Mock fetching new vs returning customers data (replace with real API call)
    const mockData: NewVsReturningData[] = [
      { date: "2025-04-01", newCustomers: 30, returningCustomers: 120 },
      { date: "2025-04-02", newCustomers: 40, returningCustomers: 160 },
      { date: "2025-04-03", newCustomers: 35, returningCustomers: 145 },
    ];
    setData(mockData);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">
        New vs Returning Customers
      </h2>
      <div className="mt-4">
        {data.map((item) => (
          <div key={item.date} className="flex justify-between p-2">
            <span>{item.date}</span>
            <span>New: {item.newCustomers}</span>
            <span>Returning: {item.returningCustomers}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewVsReturning;
