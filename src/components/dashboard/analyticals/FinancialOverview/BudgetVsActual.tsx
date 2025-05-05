// src/components/dashboard/FinancialOverview/BudgetVsActual.tsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

interface BudgetVsActualProps {
  months: string[];
  budget: number[];
  actual: number[];
}

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BudgetVsActual: React.FC<BudgetVsActualProps> = ({
  months,
  budget,
  actual,
}) => {
  const data = {
    labels: months,
    datasets: [
      {
        label: "Budget",
        data: budget,
        backgroundColor: "#60a5fa",
      },
      {
        label: "Actual",
        data: actual,
        backgroundColor: "#34d399",
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
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">Budget vs Actual</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BudgetVsActual;
