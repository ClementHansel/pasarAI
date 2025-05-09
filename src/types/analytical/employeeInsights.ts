export type AttendanceData = {
  employeeId: string;
  date: string;
  status: "Present" | "Absent" | "Remote" | "Leave";
};

export type EmployeePerformanceData = {
  employeeId: string;
  score: number;
  month: string;
};

export type EmployeeSatisfactionData = {
  employeeId: string;
  level: "Satisfied" | "Neutral" | "Dissatisfied";
  month: string;
};

export type PayrollStatusData = {
  employeeId: string;
  status: "Paid" | "Pending" | "Failed";
  month: string;
};

export type TasksWorkflowData = {
  employeeId: string;
  completedTasks: number;
  pendingTasks: number;
};

export type TeamCollaborationScoreData = {
  teamId: string;
  score: number;
};

export type TrainingProgressData = {
  employeeId: string;
  completedModules: number;
  totalModules: number;
};

export type WorkingHoursSummaryData = {
  employeeId: string;
  hours: number;
  month: string;
};
