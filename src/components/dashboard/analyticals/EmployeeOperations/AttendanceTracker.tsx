// src/components/dashboard/HRInsights/AttendanceTracker.tsx

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarCheck2, LogOut, Moon } from "lucide-react";

// Define possible attendance statuses
type AttendanceStatus = "Checked In" | "Checked Out" | "On Leave";

// Define the structure of employee attendance
interface EmployeeAttendance {
  name: string;
  status: AttendanceStatus;
  time: string;
}

// Mock data for employee attendance
const mockAttendance: EmployeeAttendance[] = [
  { name: "Alice", status: "Checked In", time: "08:03 AM" },
  { name: "Bob", status: "On Leave", time: "-" },
  { name: "Charlie", status: "Checked Out", time: "05:12 PM" },
  { name: "Dana", status: "Checked In", time: "08:15 AM" },
];

// Icon mapping for each attendance status
const statusIconMap: Record<AttendanceStatus, React.ReactNode> = {
  "Checked In": <CalendarCheck2 className="text-green-500" size={18} />,
  "Checked Out": <LogOut className="text-blue-500" size={18} />,
  "On Leave": <Moon className="text-yellow-500" size={18} />,
};

// AttendanceItem component for individual attendance entry
const AttendanceItem: React.FC<EmployeeAttendance> = ({
  name,
  status,
  time,
}) => {
  return (
    <li className="flex items-center justify-between border-b pb-2 last:border-none">
      <div className="flex items-center gap-2">
        {statusIconMap[status]}
        <span className="font-medium">{name}</span>
      </div>
      <span className="text-sm text-gray-500">{time}</span>
    </li>
  );
};

// Main AttendanceTracker component
const AttendanceTracker: React.FC = () => {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Attendance Tracker</h2>
        <ul className="space-y-3">
          {mockAttendance.map((employee) => (
            <AttendanceItem
              key={employee.name} // Using employee name as key for better performance
              name={employee.name}
              status={employee.status}
              time={employee.time}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default AttendanceTracker;
