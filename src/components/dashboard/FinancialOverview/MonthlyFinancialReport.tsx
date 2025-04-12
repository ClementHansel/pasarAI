// src/components/dashboard/FinancialOverview/MonthlyFinancialReport.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Revenue",
      data: [
        5000, 4000, 4500, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 10000,
      ],
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      fill: true,
    },
    {
      label: "Expenses",
      data: [
        3000, 2500, 2700, 3200, 3500, 3700, 3900, 4200, 4500, 4700, 5000, 5300,
      ],
      borderColor: "#ef4444",
      backgroundColor: "rgba(239, 68, 68, 0.2)",
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Monthly Financial Report",
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Month",
      },
    },
    y: {
      title: {
        display: true,
        text: "Amount ($)",
      },
    },
  },
};

const MonthlyFinancialReport: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">Monthly Financial Report</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default MonthlyFinancialReport;
