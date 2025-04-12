// src/components/dashboard/MarketingPerformance/TrafficSources.tsx
import React, { useEffect, useState } from "react";

interface SourceData {
  source: string;
  visits: number;
}

const TrafficSources: React.FC = () => {
  const [data, setData] = useState<SourceData[]>([]);

  useEffect(() => {
    const mockData: SourceData[] = [
      { source: "Google", visits: 3200 },
      { source: "Facebook", visits: 2100 },
      { source: "Email", visits: 800 },
      { source: "Referral", visits: 450 },
    ];
    setData(mockData);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Traffic Sources</h2>
      {data.map((item) => (
        <div key={item.source} className="flex justify-between py-1">
          <span>{item.source}</span>
          <span>{item.visits} visits</span>
        </div>
      ))}
    </div>
  );
};

export default TrafficSources;
