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

const mock = {
  attendance: [
    { employeeId: "E001", date: "2025-05-01", status: "Present" },
    { employeeId: "E002", date: "2025-05-01", status: "Absent" },
  ] as AttendanceData[],

  performance: [
    { employeeId: "E001", score: 87, month: "April" },
    { employeeId: "E002", score: 92, month: "April" },
  ] as EmployeePerformanceData[],

  satisfaction: [
    { employeeId: "E001", level: "Satisfied", month: "April" },
    { employeeId: "E002", level: "Neutral", month: "April" },
  ] as EmployeeSatisfactionData[],

  payroll: [
    { employeeId: "E001", status: "Paid", month: "April" },
    { employeeId: "E002", status: "Pending", month: "April" },
  ] as PayrollStatusData[],

  task: [
    { employeeId: "E001", completedTasks: 8, pendingTasks: 2 },
    { employeeId: "E002", completedTasks: 6, pendingTasks: 4 },
  ] as TasksWorkflowData[],

  collaboration: [
    { teamId: "T001", score: 85 },
    { teamId: "T002", score: 78 },
  ] as TeamCollaborationScoreData[],

  training: [
    { employeeId: "E001", completedModules: 5, totalModules: 6 },
    { employeeId: "E002", completedModules: 4, totalModules: 6 },
  ] as TrainingProgressData[],

  workingHours: [
    { employeeId: "E001", hours: 160, month: "April" },
    { employeeId: "E002", hours: 152, month: "April" },
  ] as WorkingHoursSummaryData[],
};

export default mock;
