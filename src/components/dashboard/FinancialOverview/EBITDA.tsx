// src/components/dashboard/FinancialOverview/EBITDA.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, Tooltip, Legend);

const data = {
  labels: ["January", "February", "March", "April"],
  datasets: [
    {
      label: "EBITDA",
      data: [5000, 6000, 5500, 7000],
      borderColor: "#34d399",
      backgroundColor: "rgba(52, 211, 153, 0.2)",
      fill: true,
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

const EBITDA: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">EBITDA</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default EBITDA;
