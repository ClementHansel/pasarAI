import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarCheck2, LogOut, Moon } from "lucide-react";
import {
  AttendanceData,
  AttendanceStatus,
} from "@/types/analytical/employeeInsights";

// Internal normalized format
export interface EmployeeAttendance {
  name: string;
  status: AttendanceStatus;
  time: string;
}

// Icon mapping for each attendance status
const statusIconMap: Record<AttendanceStatus, React.ReactNode> = {
  "Checked In": <CalendarCheck2 className="text-green-500" size={18} />,
  "Checked Out": <LogOut className="text-blue-500" size={18} />,
  "On Leave": <Moon className="text-yellow-500" size={18} />,
  Absent: <LogOut className="text-red-500" size={18} />,
  Late: <CalendarCheck2 className="text-orange-500" size={18} />,
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

// Props now accept AttendanceData[] (external shape)
interface AttendanceTrackerProps {
  data?: AttendanceData[];
  isLoading?: boolean;
  error?: string;
}

// Main AttendanceTracker component
const AttendanceTracker: React.FC<AttendanceTrackerProps> = ({
  data,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4">Attendance Tracker</h2>
          <p className="text-sm text-muted-foreground">
            Loading attendance data...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4">Attendance Tracker</h2>
          <p className="text-sm text-red-500">Error: {error}</p>
        </CardContent>
      </Card>
    );
  }

  // Transform the data to internal format
  const transformedData: EmployeeAttendance[] | undefined = data?.map(
    (item) => ({
      name: item.employee,
      status: item.status,
      time: item.timestamp,
    })
  );

  return (
    <Card className="rounded-2xl shadow-md">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Attendance Tracker</h2>
        {!transformedData || transformedData.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No attendance data available.
          </p>
        ) : (
          <ul className="space-y-3">
            {transformedData.map((employee) => (
              <AttendanceItem
                key={`${employee.name}-${employee.time}`}
                name={employee.name}
                status={employee.status}
                time={employee.time}
              />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendanceTracker;
