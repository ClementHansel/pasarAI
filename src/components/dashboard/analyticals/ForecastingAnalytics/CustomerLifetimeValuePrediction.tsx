// src/components/dashboard/ForecastingAnalytics/CustomerLifetimeValuePrediction.tsx
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

const initialCLVData: ChartData = {
  labels: ["Q1", "Q2", "Q3", "Q4"],
  datasets: [
    {
      label: "Predicted Customer Lifetime Value (CLV)",
      data: [500, 700, 850, 1000],
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: true,
    },
  ],
};

const CustomerLifetimeValuePrediction: React.FC = () => {
  const [clvPrediction, setClvPrediction] = useState<ChartData>(initialCLVData);

  useEffect(() => {
    setTimeout(() => {
      setClvPrediction((prevPrediction) => ({
        ...prevPrediction,
        datasets: [
          {
            ...prevPrediction.datasets[0],
            data: [550, 750, 900, 1050],
          },
        ],
      }));
    }, 2000); // Simulate API call
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h2 className="text-2xl font-bold mb-6">
        Customer Lifetime Value Prediction
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Forecasting customer lifetime value over the next quarters.
      </p>
      <Line
        data={clvPrediction}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
};

export default CustomerLifetimeValuePrediction;
