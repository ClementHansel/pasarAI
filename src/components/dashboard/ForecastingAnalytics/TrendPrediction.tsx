// src/components/dashboard/ForecastingAnalytics/TrendPrediction.tsx
"use client";
import React, { useState, useEffect } from "react";
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

// Define the type for the chart data structure
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
  }[];
}

const initialPredictionData: ChartData = {
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
  const [prediction, setPrediction] = useState<ChartData>(
    initialPredictionData
  );

  // Simulate fetching prediction data (replace with actual logic)
  useEffect(() => {
    setTimeout(() => {
      setPrediction((prevPrediction) => ({
        ...prevPrediction,
        datasets: [
          {
            ...prevPrediction.datasets[0],
            data: [
              13000, 14500, 16000, 18000, 20000, 22000, 24000, 26000, 28000,
              30000,
            ],
          },
        ],
      }));
    }, 2000); // Simulate API call
  }, []); // Empty dependency array means this runs once after the component mounts

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h2 className="text-2xl font-bold mb-6">Trend Prediction</h2>
      <p className="text-sm text-gray-600 mb-6">
        Forecasting future trends based on historical data.
      </p>
      <Line
        data={prediction}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
};

export default TrendPrediction;
