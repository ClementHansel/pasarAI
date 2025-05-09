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

const initialROIData: ChartData = {
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
      label: "ROI Performance",
      data: [5, 6, 7, 8, 10, 12, 14, 15, 17, 19],
      borderColor: "rgb(54, 162, 235)",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      fill: true,
    },
  ],
};

const ROIPerformance: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow w-full h-96">
      {" "}
      {/* Fixed height */}
      <h2 className="text-2xl font-bold mb-6">ROI Performance</h2>
      <p className="text-sm text-gray-600 mb-6">
        Forecasting ROI performance over time.
      </p>
      <Line
        data={initialROIData} // Static data used directly here
        options={{
          responsive: true,
          maintainAspectRatio: true, // Keep aspect ratio
        }}
      />
    </div>
  );
};

export default ROIPerformance;
