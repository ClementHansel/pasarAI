// src/components/dashboard/EmployeeOperations/TrainingProgress.tsx

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrainingProgressData } from "@/types/analytical/employeeInsights";

interface TrainingProgressProps {
  data?: TrainingProgressData[];
}

const TrainingProgress: React.FC<TrainingProgressProps> = ({ data }) => {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Training Progress</h2>
        {data && data.length > 0 ? (
          <ul className="space-y-3">
            {data.map((employee) => (
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
        ) : (
          <p className="text-sm text-muted-foreground">
            No training data available.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default TrainingProgress;
