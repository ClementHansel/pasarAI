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

interface MonthlyFinancialReportProps {
  labels: string[];
  revenue: number[];
  expenses: number[];
}

const MonthlyFinancialReport: React.FC<MonthlyFinancialReportProps> = ({
  labels,
  revenue,
  expenses,
}) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: revenue,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
      },
      {
        label: "Expenses",
        data: expenses,
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

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">Monthly Financial Report</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default MonthlyFinancialReport;
