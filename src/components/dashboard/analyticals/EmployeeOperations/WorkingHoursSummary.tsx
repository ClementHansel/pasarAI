// src/components/dashboard/EmployeeOperations/WorkingHoursSummary.tsx

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface EmployeeWorkHours {
  name: string;
  hoursWorked: number; // Total hours worked in the given period
}

const mockEmployeeWorkHours: EmployeeWorkHours[] = [
  { name: "Alice", hoursWorked: 40 },
  { name: "Bob", hoursWorked: 35 },
  { name: "Charlie", hoursWorked: 45 },
  { name: "Dana", hoursWorked: 38 },
];

export default function WorkingHoursSummary() {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Working Hours Summary</h2>
        <ul className="space-y-3">
          {mockEmployeeWorkHours.map((employee) => (
            <li
              key={employee.name}
              className="flex items-center justify-between border-b pb-2 last:border-none"
            >
              <span className="font-medium">{employee.name}</span>
              <span className="text-sm text-gray-500">
                {employee.hoursWorked} hours
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
