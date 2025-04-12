// src/components/dashboard/EmployeeOperations/EmployeeSatisfaction.tsx

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface EmployeeSatisfactionData {
  name: string;
  satisfactionScore: number; // 1 to 100 scale
}

const mockSatisfactionData: EmployeeSatisfactionData[] = [
  { name: "Alice", satisfactionScore: 80 },
  { name: "Bob", satisfactionScore: 65 },
  { name: "Charlie", satisfactionScore: 90 },
  { name: "Dana", satisfactionScore: 75 },
];

export default function EmployeeSatisfaction() {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Employee Satisfaction</h2>
        <ul className="space-y-3">
          {mockSatisfactionData.map((employee) => (
            <li
              key={employee.name}
              className="flex items-center justify-between border-b pb-2 last:border-none"
            >
              <span className="font-medium">{employee.name}</span>
              <span className="text-sm text-gray-500">
                {employee.satisfactionScore}%
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
