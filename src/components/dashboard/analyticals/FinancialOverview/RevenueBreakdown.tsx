import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface RevenueBreakdownProps {
  labels: string[];
  data: number[];
}

const RevenueBreakdown: React.FC<RevenueBreakdownProps> = ({
  labels,
  data,
}) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data,
        backgroundColor: ["#4ade80", "#60a5fa", "#facc15", "#f87171"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">Revenue Breakdown</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default RevenueBreakdown;
