// src/components/dashboard/MarketingPerformance/LandingPagePerformance.tsx
import React from "react";

const LandingPagePerformance: React.FC = () => {
  const pages = [
    { url: "/promo", visits: 1000, bounceRate: 30, time: "1m 30s" },
    { url: "/signup", visits: 800, bounceRate: 40, time: "1m 10s" },
    { url: "/features", visits: 500, bounceRate: 20, time: "2m 5s" },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-3">Landing Page Performance</h2>
      {pages.map((p) => (
        <div key={p.url} className="mb-2">
          <p className="font-medium">{p.url}</p>
          <p>
            Visits: {p.visits} | Bounce Rate: {p.bounceRate}% | Time: {p.time}
          </p>
        </div>
      ))}
    </div>
  );
};

export default LandingPagePerformance;
