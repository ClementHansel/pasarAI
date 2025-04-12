// src/components/dashboard/ForecastingAnalytics/TrendAnalysis.tsx
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

// Registering chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Mock Data for Trend Analysis (Revenue, Profit, and Demand)
const trendData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"], // Months of the year
  datasets: [
    {
      label: "Revenue",
      data: [12000, 15000, 18000, 22000, 25000, 27000, 30000], // Revenue data
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: true,
    },
    {
      label: "Profit",
      data: [5000, 6000, 7500, 9000, 10000, 11000, 12000], // Profit data
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      fill: true,
    },
    {
      label: "Demand",
      data: [1000, 1200, 1400, 1600, 1800, 2000, 2200], // Demand data
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.2)",
      fill: true,
    },
  ],
};

const TrendAnalysis: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h2 className="text-2xl font-bold mb-6">Trend Analysis</h2>

      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Analyzing trends for key metrics including Revenue, Profit, and Demand
          over the last few months.
        </p>
      </div>

      <div className="mb-6">
        <Line
          data={trendData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Revenue Growth</h3>
          <p className="text-lg font-medium text-green-500">
            +20% increase from January to July
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Profit Growth</h3>
          <p className="text-lg font-medium text-green-500">
            +15% increase from January to July
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Demand Growth</h3>
          <p className="text-lg font-medium text-blue-500">
            +12% increase from January to July
          </p>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-sm text-gray-600">
          These trends help visualize the growth across major business metrics
          and can assist in data-driven decision making.
        </p>
      </div>
    </div>
  );
};

export default TrendAnalysis;
