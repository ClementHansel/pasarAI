"use client";

import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

import AttendanceTracker from "@/components/dashboard/analyticals/EmployeeOperations/AttendanceTracker";
import EmployeePerformance from "@/components/dashboard/analyticals/EmployeeOperations/EmployeePerformance";
import EmployeeSatisfaction from "@/components/dashboard/analyticals/EmployeeOperations/EmployeeSatisfaction";
import PayrollStatus from "@/components/dashboard/analyticals/EmployeeOperations/PayrollStatus";
import TasksWorkflow from "@/components/dashboard/analyticals/EmployeeOperations/TasksWorkflow";
import TeamCollaborationScore from "@/components/dashboard/analyticals/EmployeeOperations/TeamCollaborationScore";
import TrainingProgress from "@/components/dashboard/analyticals/EmployeeOperations/TrainingProgress";
import WorkingHoursSummary from "@/components/dashboard/analyticals/EmployeeOperations/WorkingHoursSummary";

import {
  AttendanceData,
  EmployeePerformanceData,
  EmployeeSatisfactionData,
  PayrollStatusData,
  TasksWorkflowData,
  TeamCollaborationScoreData,
  TrainingProgressData,
  WorkingHoursSummaryData,
} from "@/types/analytical/employeeInsights";

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || "dev_access_secret";

const EmployeeOperationsPage = () => {
  const [unauthorized, setUnauthorized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [attendance, setAttendance] = useState<AttendanceData[]>();
  const [performance, setPerformance] = useState<EmployeePerformanceData[]>();
  const [satisfaction, setSatisfaction] =
    useState<EmployeeSatisfactionData[]>();
  const [payroll, setPayroll] = useState<PayrollStatusData[]>();
  const [tasks, setTasks] = useState<TasksWorkflowData[]>();
  const [collaboration, setCollaboration] =
    useState<TeamCollaborationScoreData[]>();
  const [training, setTraining] = useState<TrainingProgressData[]>();
  const [workingHours, setWorkingHours] = useState<WorkingHoursSummaryData[]>();

  const [token, setToken] = useState<string | null>(null);

  // Decode JWT and check role
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUnauthorized(true);
      return;
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as {
        id: string;
        email: string;
        role: "BUYER" | "SELLER" | "ADMIN";
      };

      if (decoded.role !== "SELLER" && decoded.role !== "ADMIN") {
        setUnauthorized(true);
        return;
      }

      setToken(token);
    } catch (err) {
      console.error("Invalid token", err);
      setUnauthorized(true);
    }
  }, []);

  // Fetch metrics from API
  useEffect(() => {
    if (!token) return;

    const fetchData = async (metric: string) => {
      try {
        const res = await fetch(
          `/api/analytics/EmployeeOperations?metric=${metric}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          const errRes = await res.json();
          throw new Error(errRes.error || "Failed to fetch");
        }

        const data = await res.json();
        switch (metric) {
          case "attendance":
            setAttendance(data);
            break;
          case "performance":
            setPerformance(data);
            break;
          case "satisfaction":
            setSatisfaction(data);
            break;
          case "payroll":
            setPayroll(data);
            break;
          case "task":
            setTasks(data);
            break;
          case "collaboration":
            setCollaboration(data);
            break;
          case "training":
            setTraining(data);
            break;
          case "workingHours":
            setWorkingHours(data);
            break;
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error(`Failed to fetch ${metric}:`, err.message);
          setError(err.message);
        } else {
          console.error(`Unexpected error fetching ${metric}:`, err);
          setError("An unexpected error occurred");
        }
      }
    };

    const metrics = [
      "attendance",
      "performance",
      "satisfaction",
      "payroll",
      "task",
      "collaboration",
      "training",
      "workingHours",
    ];

    metrics.forEach(fetchData);
  }, [token]);

  if (unauthorized) {
    return (
      <div className="p-4 text-red-600 font-medium">
        ❌ Unauthorized: You do not have access to view this page.
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">👩‍💻 Employee Operations</h1>

      {error && <div className="text-red-500 font-medium">Error: {error}</div>}

      <AttendanceTracker data={attendance} />
      <EmployeePerformance data={performance} />
      <EmployeeSatisfaction data={satisfaction} />
      <PayrollStatus data={payroll} />
      <TasksWorkflow data={tasks} />
      <TeamCollaborationScore data={collaboration} />
      <TrainingProgress data={training} />
      <WorkingHoursSummary data={workingHours} />
    </div>
  );
};

export default EmployeeOperationsPage;
