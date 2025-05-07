export type AttendanceStatus =
  | "Checked In"
  | "Checked Out"
  | "Absent"
  | "Late"
  | "On Leave";

export interface AttendanceData {
  employee: string;
  status: AttendanceStatus;
  timestamp: string;
}

export interface EmployeePerformanceData {
  name: string;
  completedTasks: number;
}

export interface EmployeeSatisfactionData {
  name: string;
  satisfactionScore: number; // 1 to 100 scale
}

export interface PayrollStatusData {
  name: string;
  payrollStatus: "Paid" | "Pending";
}

export interface TasksWorkflowData {
  id: number;
  title: string;
  progress: number;
  status: "Not Started" | "In Progress" | "Completed";
}

export interface TeamCollaborationScoreData {
  teamName: string;
  collaborationScore: number;
}

export interface TrainingProgressData {
  name: string;
  trainingCourse: string;
  completion: number; // Percentage of completion
}

export interface WorkingHoursSummaryData {
  name: string;
  hoursWorked: number;
}

export interface EmployeeInsightsData {
  attendance: AttendanceData[];
  performance: EmployeePerformanceData[];
  satisfaction: EmployeeSatisfactionData[];
  payroll: PayrollStatusData[];
  tasks: TasksWorkflowData[];
  collaboration: TeamCollaborationScoreData[];
  training: TrainingProgressData[];
  workingHours: WorkingHoursSummaryData[];
}

export type FetchInsightResponse =
  | { error: string }
  | Partial<EmployeeInsightsData>;
