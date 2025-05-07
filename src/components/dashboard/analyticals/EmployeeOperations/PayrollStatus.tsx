"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/Skeleton";
import { PayrollStatusData } from "@/types/analytical/employeeInsights";

interface PayrollStatusProps {
  data?: PayrollStatusData[];
}

export default function PayrollStatus({ data }: PayrollStatusProps) {
  if (!data) {
    return (
      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4">Payroll Status</h2>
          <Skeleton className="h-[100px] w-full rounded-md" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl shadow-md">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Payroll Status</h2>
        <ul className="space-y-3">
          {data.map((employee) => (
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
