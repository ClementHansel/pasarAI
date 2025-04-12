// src/components/dashboard/FinancialOverview/RevenueBreakdown.tsx
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const RevenueBreakdown: React.FC = () => {
  const data = {
    labels: ["Online Store", "Retail", "Wholesale", "Subscriptions"],
    datasets: [
      {
        label: "Revenue",
        data: [60000, 20000, 10000, 5000],
        backgroundColor: ["#4ade80", "#60a5fa", "#facc15", "#f87171"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">Revenue Breakdown</h2>
      <Pie data={data} />
    </div>
  );
};

export default RevenueBreakdown;
