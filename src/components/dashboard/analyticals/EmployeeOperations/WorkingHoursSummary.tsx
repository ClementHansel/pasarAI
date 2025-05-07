// src/components/dashboard/EmployeeOperations/WorkingHoursSummary.tsx

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { WorkingHoursSummaryData } from "@/types/analytical/employeeInsights";
// Ensure correct type import

interface WorkingHoursSummaryProps {
  data?: WorkingHoursSummaryData[];
}

const WorkingHoursSummary: React.FC<WorkingHoursSummaryProps> = ({ data }) => {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Working Hours Summary</h2>
        {data && data.length > 0 ? (
          <ul className="space-y-3">
            {data.map((employee) => (
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
        ) : (
          <p className="text-sm text-muted-foreground">
            No working hours data available.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkingHoursSummary;
