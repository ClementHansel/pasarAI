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
import { Skeleton } from "@/components/ui/Skeleton";
import { EmployeePerformanceData } from "@/types/analytical/employeeInsights";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface EmployeePerformanceProps {
  data?: EmployeePerformanceData[];
}

export default function EmployeePerformance({
  data,
}: EmployeePerformanceProps) {
  if (!data) {
    return (
      <Card className="col-span-1">
        <CardContent className="space-y-4">
          <h2 className="text-lg font-semibold">Employee Performance</h2>
          <Skeleton className="h-[200px] w-full rounded-md" />
        </CardContent>
      </Card>
    );
  }

  const labels = data.map((item) => item.name);
  const completedTasks = data.map((item) => item.completedTasks);

  const previous = completedTasks[0];
  const current = completedTasks[completedTasks.length - 1];
  const percentageChange = previous
    ? ((current - previous) / previous) * 100
    : 0;

  const chartData = {
    labels,
    datasets: [
      {
        label: "Completed Tasks",
        data: completedTasks,
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

  return (
    <Card className="col-span-1">
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Employee Performance</h2>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <ArrowUpRight className="w-4 h-4 text-green-500" />+
            {percentageChange.toFixed(2)}% this week
          </span>
        </div>
        <Bar data={chartData} options={options} />
      </CardContent>
    </Card>
  );
}
