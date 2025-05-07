// src/components/dashboard/MarketingPerformance/FunnelBreakdown.tsx
import React from "react";

const FunnelBreakdown: React.FC = () => {
  const funnel = [
    { stage: "Awareness", users: 5000 },
    { stage: "Interest", users: 3000 },
    { stage: "Decision", users: 1200 },
    { stage: "Action", users: 400 },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-3">Marketing Funnel</h2>
      {funnel.map((f, idx) => (
        <div key={idx} className="flex justify-between py-1">
          <span>{f.stage}</span>
          <span>{f.users} users</span>
        </div>
      ))}
    </div>
  );
};

export default FunnelBreakdown;
