// src/components/dashboard/MarketingPerformance/EmailMarketingStats.tsx
"use client";
import React, { useEffect, useState } from "react";

interface EmailStats {
  subject: string;
  openRate: number;
  clickRate: number;
  bounceRate: number;
}

const EmailMarketingStats: React.FC = () => {
  const [emails, setEmails] = useState<EmailStats[]>([]);

  useEffect(() => {
    setEmails([
      { subject: "Welcome Email", openRate: 58, clickRate: 20, bounceRate: 3 },
      {
        subject: "Monthly Newsletter",
        openRate: 42,
        clickRate: 18,
        bounceRate: 5,
      },
      { subject: "Promo Offer", openRate: 35, clickRate: 25, bounceRate: 7 },
    ]);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-3">Email Marketing Stats</h2>
      {emails.map((e) => (
        <div key={e.subject} className="mb-2">
          <p className="font-medium">{e.subject}</p>
          <p>
            Open: {e.openRate}% | Click: {e.clickRate}% | Bounce: {e.bounceRate}
            %
          </p>
        </div>
      ))}
    </div>
  );
};

export default EmailMarketingStats;
