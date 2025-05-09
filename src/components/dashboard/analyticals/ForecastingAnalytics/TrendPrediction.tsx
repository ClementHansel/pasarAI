"use client";
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

// Static chart data
const initialPredictionData = {
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
  ],
  datasets: [
    {
      label: "Predicted Revenue",
      data: [
        12000, 13500, 15000, 17000, 19000, 21000, 23000, 25000, 27000, 29000,
      ],
      borderColor: "rgb(54, 162, 235)",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      fill: true,
    },
  ],
};

const TrendPrediction: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow w-full h-96">
      {" "}
      {/* Fixed height */}
      <h2 className="text-2xl font-bold mb-6">Trend Prediction</h2>
      <p className="text-sm text-gray-600 mb-6">
        Forecasting future trends based on historical data.
      </p>
      <Line
        data={initialPredictionData} // Static data used directly
        options={{
          responsive: true,
          maintainAspectRatio: true, // Keep aspect ratio
        }}
      />
    </div>
  );
};

export default TrendPrediction;
