// src/components/dashboard/MarketingPerformance/ConversionRate.tsx
import React, { useEffect, useState } from "react";

interface ConversionData {
  date: string;
  visitors: number;
  conversions: number;
}

const ConversionRate: React.FC = () => {
  const [data, setData] = useState<ConversionData[]>([]);

  useEffect(() => {
    const mockData: ConversionData[] = [
      { date: "2025-04-01", visitors: 1000, conversions: 100 },
      { date: "2025-04-02", visitors: 1200, conversions: 110 },
      { date: "2025-04-03", visitors: 1500, conversions: 160 },
    ];
    setData(mockData);
  }, []);

  const calculateRate = (conversions: number, visitors: number) =>
    ((conversions / visitors) * 100).toFixed(2);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Conversion Rate</h2>
      {data.map((item) => (
        <div key={item.date} className="flex justify-between py-1">
          <span>{item.date}</span>
          <span>{calculateRate(item.conversions, item.visitors)}%</span>
        </div>
      ))}
    </div>
  );
};

export default ConversionRate;
