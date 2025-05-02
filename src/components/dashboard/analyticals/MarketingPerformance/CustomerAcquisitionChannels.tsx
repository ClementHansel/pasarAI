// src/components/dashboard/MarketingPerformance/CustomerAcquisitionChannels.tsx
import React from "react";

const CustomerAcquisitionChannels: React.FC = () => {
  const data = [
    { channel: "Google", customers: 1200 },
    { channel: "Facebook", customers: 900 },
    { channel: "Email", customers: 600 },
    { channel: "Referrals", customers: 300 },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-3">Customer Acquisition Channels</h2>
      {data.map((c) => (
        <div key={c.channel} className="flex justify-between py-1">
          <span>{c.channel}</span>
          <span>{c.customers}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomerAcquisitionChannels;
