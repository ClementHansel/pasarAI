"use client";

import { useEffect, useState } from "react";

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

import mock from "@/data/mockEmployeeData";

const EmployeeOperationsPage = () => {
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

  useEffect(() => {
    try {
      setAttendance(mock.attendance);
      setPerformance(mock.performance);
      setSatisfaction(mock.satisfaction);
      setPayroll(mock.payroll);
      setTasks(mock.task);
      setCollaboration(mock.collaboration);
      setTraining(mock.training);
      setWorkingHours(mock.workingHours);
    } catch {
      setError("Failed to load mock data");
    }
  }, []);

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">👩‍💻 Employee Operations</h1>

      {error && <div className="text-red-500 font-medium">Error: {error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <AttendanceTracker data={attendance} />
        <EmployeePerformance data={performance} />
        <EmployeeSatisfaction data={satisfaction} />
        <PayrollStatus data={payroll} />
        <TasksWorkflow data={tasks} />
        <TeamCollaborationScore data={collaboration} />
        <TrainingProgress data={training} />
        <WorkingHoursSummary data={workingHours} />
      </div>
    </div>
  );
};

export default EmployeeOperationsPage;
