// src/components/dashboard/ForecastingAnalytics/RegionalComparison.tsx
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

const initialRegionalData: ChartData = {
  labels: ["North America", "Europe", "Asia", "Australia"],
  datasets: [
    {
      label: "Sales by Region",
      data: [12000, 18000, 15000, 8000],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

const RegionalComparison: React.FC = () => {
  const [regionalSales, setRegionalSales] =
    useState<ChartData>(initialRegionalData);

  useEffect(() => {
    setTimeout(() => {
      setRegionalSales((prevSales) => ({
        ...prevSales,
        datasets: [
          {
            ...prevSales.datasets[0],
            data: [13000, 19000, 16000, 9500],
          },
        ],
      }));
    }, 2000); // Simulate API call
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h2 className="text-2xl font-bold mb-6">Regional Comparison</h2>
      <p className="text-sm text-gray-600 mb-6">
        Comparing sales performance across regions.
      </p>
      <Bar
        data={regionalSales}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
};

export default RegionalComparison;
