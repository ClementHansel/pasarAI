// src/components/dashboard/EmployeeOperations/PayrollStatus.tsx

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface EmployeePayroll {
  name: string;
  payrollStatus: "Paid" | "Pending";
}

const mockPayrollStatus: EmployeePayroll[] = [
  { name: "Alice", payrollStatus: "Paid" },
  { name: "Bob", payrollStatus: "Pending" },
  { name: "Charlie", payrollStatus: "Paid" },
  { name: "Dana", payrollStatus: "Pending" },
];

export default function PayrollStatus() {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Payroll Status</h2>
        <ul className="space-y-3">
          {mockPayrollStatus.map((employee) => (
            <li
              key={employee.name}
              className="flex items-center justify-between border-b pb-2 last:border-none"
            >
              <span className="font-medium">{employee.name}</span>
              <span
                className={`text-sm ${
                  employee.payrollStatus === "Paid"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {employee.payrollStatus}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
