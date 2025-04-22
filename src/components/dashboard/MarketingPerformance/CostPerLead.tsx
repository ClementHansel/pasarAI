// src/components/dashboard/MarketingPerformance/CostPerLead.tsx
import React from "react";

const CostPerLead: React.FC = () => {
  const campaigns = [
    { campaign: "Google Ads", leads: 150, cost: 1200 },
    { campaign: "Facebook Ads", leads: 100, cost: 800 },
    { campaign: "Email Campaign", leads: 60, cost: 300 },
  ];

  const calcCPL = (cost: number, leads: number) => (cost / leads).toFixed(2);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-3">Cost Per Lead</h2>
      {campaigns.map((c) => (
        <div key={c.campaign} className="flex justify-between py-1">
          <span>{c.campaign}</span>
          <span>${calcCPL(c.cost, c.leads)}</span>
        </div>
      ))}
    </div>
  );
};

export default CostPerLead;
