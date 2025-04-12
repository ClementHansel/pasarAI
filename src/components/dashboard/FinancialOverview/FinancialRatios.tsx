// src/components/dashboard/FinancialOverview/FinancialRatios.tsx
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: [
    "Profit Margin",
    "Operating Margin",
    "Return on Assets",
    "Debt to Equity",
  ],
  datasets: [
    {
      label: "Financial Ratios",
      data: [50, 30, 15, 5],
      backgroundColor: ["#34d399", "#3b82f6", "#f59e0b", "#ef4444"],
      hoverOffset: 4,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const FinancialRatios: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">Financial Ratios</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default FinancialRatios;
