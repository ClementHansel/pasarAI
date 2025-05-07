import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

interface EBITDAProps {
  labels: string[];
  values: number[];
}

const EBITDA: React.FC<EBITDAProps> = ({ labels, values }) => {
  const data = {
    labels,
    datasets: [
      {
        label: "EBITDA",
        data: values,
        borderColor: "#34d399",
        backgroundColor: "rgba(52, 211, 153, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <h2 className="text-lg font-bold mb-4">EBITDA</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default EBITDA;
