// src/components/dashboard/EmployeeOperations/EmployeeSatisfaction.tsx

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { EmployeeSatisfactionData } from "@/types/analytical/employeeInsights";

interface EmployeeSatisfactionProps {
  data?: EmployeeSatisfactionData[];
}

export default function EmployeeSatisfaction({
  data = [],
}: EmployeeSatisfactionProps) {
  // Get color based on score
  const getBarColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="rounded-2xl shadow-md">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Employee Satisfaction</h2>

        {data.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            No satisfaction data available.
          </div>
        ) : (
          <ul className="space-y-4">
            {data.map((employee) => (
              <li key={employee.name} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{employee.name}</span>
                  <span className="text-sm text-gray-500">
                    {employee.satisfactionScore}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getBarColor(
                      employee.satisfactionScore
                    )}`}
                    style={{ width: `${employee.satisfactionScore}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
