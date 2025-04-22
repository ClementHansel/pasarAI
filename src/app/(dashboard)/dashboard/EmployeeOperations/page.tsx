import AttendanceTracker from "@/components/dashboard/EmployeeOperations/AttendanceTracker";
import EmployeePerformance from "@/components/dashboard/EmployeeOperations/EmployeePerformance";
import EmployeeSatisfaction from "@/components/dashboard/EmployeeOperations/EmployeeSatisfaction";
import PayrollStatus from "@/components/dashboard/EmployeeOperations/PayrollStatus";
import TasksWorkflow from "@/components/dashboard/EmployeeOperations/TasksWorkflow";
import TeamCollaborationScore from "@/components/dashboard/EmployeeOperations/TeamCollaborationScore";
import TrainingProgress from "@/components/dashboard/EmployeeOperations/TrainingProgress";
import WorkingHoursSummary from "@/components/dashboard/EmployeeOperations/WorkingHoursSummary";

export default function EmployeeOperationsPage() {
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">👩‍💻 Employee Operations</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AttendanceTracker />
        <EmployeePerformance />
        <EmployeeSatisfaction />
        <PayrollStatus />
        <TasksWorkflow />
        <TeamCollaborationScore />
        <TrainingProgress />
        <WorkingHoursSummary />
      </div>
    </div>
  );
}
