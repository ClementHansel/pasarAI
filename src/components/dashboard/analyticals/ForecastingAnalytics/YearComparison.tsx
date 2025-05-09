import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const yearComparisonData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "2024 Revenue",
      data: [10000, 12000, 14000, 16000, 18000, 20000, 22000],
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: true,
    },
    {
      label: "2025 Revenue",
      data: [12000, 14000, 16000, 18000, 20000, 22000, 24000],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      fill: true,
    },
  ],
};

const YearComparison: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow w-full h-96">
      {" "}
      {/* Fixed height */}
      <h2 className="text-2xl font-bold mb-6">Year-over-Year Comparison</h2>
      <p className="text-sm text-gray-600 mb-6">
        Compare trends in key metrics (Revenue, Profit, and Demand) across
        different years.
      </p>
      <Line
        data={yearComparisonData}
        options={{
          responsive: true,
          maintainAspectRatio: true,
        }}
      />
    </div>
  );
};

export default YearComparison;
