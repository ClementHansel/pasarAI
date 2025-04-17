// src/components/dashboard/MarketingPerformance/AdSpendROI.tsx
"use client";
import React, { useEffect, useState } from "react";

interface ROIData {
  campaign: string;
  spend: number;
  revenue: number;
}

const AdSpendROI: React.FC = () => {
  const [data, setData] = useState<ROIData[]>([]);

  useEffect(() => {
    const mockData: ROIData[] = [
      { campaign: "Google Ads", spend: 1000, revenue: 2500 },
      { campaign: "Facebook Ads", spend: 800, revenue: 1900 },
      { campaign: "Instagram Ads", spend: 600, revenue: 1200 },
    ];
    setData(mockData);
  }, []);

  const calculateROI = (revenue: number, spend: number) =>
    ((revenue - spend) / spend) * 100;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Ad Spend ROI</h2>
      {data.map((item) => (
        <div key={item.campaign} className="flex justify-between py-1">
          <span>{item.campaign}</span>
          <span>{calculateROI(item.revenue, item.spend).toFixed(2)}%</span>
        </div>
      ))}
    </div>
  );
};

export default AdSpendROI;
