// src/components/dashboard/MarketingPerformance/CampaignPerformance.tsx
"use client";
import React, { useEffect, useState } from "react";

interface Campaign {
  name: string;
  impressions: number;
  clicks: number;
  leads: number;
}

const CampaignPerformance: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    setCampaigns([
      { name: "Spring Promo", impressions: 5000, clicks: 1200, leads: 150 },
      { name: "Holiday Sale", impressions: 4200, clicks: 950, leads: 100 },
      { name: "New Launch", impressions: 3000, clicks: 800, leads: 90 },
    ]);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-3">Campaign Performance</h2>
      {campaigns.map((c) => (
        <div key={c.name} className="mb-2">
          <p className="font-medium">{c.name}</p>
          <p>
            Impressions: {c.impressions} | Clicks: {c.clicks} | Leads: {c.leads}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CampaignPerformance;
