"use client";
import React, { useState } from "react";
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

const clvPredictionData: ChartData = {
  labels: ["Q1", "Q2", "Q3", "Q4"],
  datasets: [
    {
      label: "Predicted Customer Lifetime Value (CLV)",
      data: [500, 700, 850, 1000], // Static mock data
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: true,
    },
  ],
};

const CustomerLifetimeValuePrediction: React.FC = () => {
  const [clvPrediction] = useState<ChartData>(clvPredictionData);

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full h-96">
      {" "}
      {/* Fixed height with h-96 */}
      <h2 className="text-2xl font-bold mb-6">
        Customer Lifetime Value Prediction
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Forecasting customer lifetime value over the next quarters.
      </p>
      <Line
        data={clvPrediction}
        options={{
          responsive: true,
          maintainAspectRatio: true, // Ensure the aspect ratio is maintained
        }}
      />
    </div>
  );
};

export default CustomerLifetimeValuePrediction;
