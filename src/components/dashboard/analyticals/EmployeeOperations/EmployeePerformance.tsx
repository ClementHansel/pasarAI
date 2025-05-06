"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { ArrowUpRight } from "lucide-react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const data = {
  labels: ["Alice", "Bob", "Charlie", "Diana", "Eve"],
  datasets: [
    {
      label: "Completed Tasks",
      data: [120, 90, 140, 110, 95],
      backgroundColor: "#4f46e5",
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" as const },
  },
};

export default function EmployeePerformance() {
  return (
    <Card className="col-span-1">
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Employee Performance</h2>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <ArrowUpRight className="w-4 h-4 text-green-500" />
            +7% this week
          </span>
        </div>
        <Bar data={data} options={options} />
      </CardContent>
    </Card>
  );
}
