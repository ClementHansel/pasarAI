import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface FinancialRatiosProps {
  labels: string[];
  values: number[];
}

const FinancialRatios: React.FC<FinancialRatiosProps> = ({
  labels,
  values,
}) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Financial Ratios",
        data: values,
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

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">Financial Ratios</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default FinancialRatios;
