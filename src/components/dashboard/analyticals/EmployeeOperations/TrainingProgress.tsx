// src/components/dashboard/EmployeeOperations/TrainingProgress.tsx

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface EmployeeTraining {
  name: string;
  trainingCourse: string;
  completion: number; // Percentage of completion
}

const mockEmployeeTraining: EmployeeTraining[] = [
  { name: "Alice", trainingCourse: "JavaScript Fundamentals", completion: 75 },
  { name: "Bob", trainingCourse: "React Basics", completion: 50 },
  { name: "Charlie", trainingCourse: "TypeScript Advanced", completion: 90 },
  { name: "Dana", trainingCourse: "Node.js Backend", completion: 60 },
];

export default function TrainingProgress() {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Training Progress</h2>
        <ul className="space-y-3">
          {mockEmployeeTraining.map((employee) => (
            <li
              key={employee.name}
              className="flex items-center justify-between border-b pb-2 last:border-none"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium">{employee.name}</span>
                <span className="text-sm text-gray-500">
                  {employee.trainingCourse}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {employee.completion}%
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
