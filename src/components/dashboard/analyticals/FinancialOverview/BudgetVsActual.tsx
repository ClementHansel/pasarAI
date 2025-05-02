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

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const data = {
  labels: ["January", "February", "March", "April"],
  datasets: [
    {
      label: "Budget",
      data: [10000, 12000, 11000, 14000],
      backgroundColor: "#60a5fa",
    },
    {
      label: "Actual",
      data: [9500, 12500, 10500, 13500],
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

const BudgetVsActual: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">Budget vs Actual</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BudgetVsActual;
