import AttendanceTracker from "@/components/dashboard/analyticals/EmployeeOperations/AttendanceTracker";
import EmployeePerformance from "@/components/dashboard/analyticals/EmployeeOperations/EmployeePerformance";
import EmployeeSatisfaction from "@/components/dashboard/analyticals/EmployeeOperations/EmployeeSatisfaction";
import PayrollStatus from "@/components/dashboard/analyticals/EmployeeOperations/PayrollStatus";
import TasksWorkflow from "@/components/dashboard/analyticals/EmployeeOperations/TasksWorkflow";
import TeamCollaborationScore from "@/components/dashboard/analyticals/EmployeeOperations/TeamCollaborationScore";
import TrainingProgress from "@/components/dashboard/analyticals/EmployeeOperations/TrainingProgress";
import WorkingHoursSummary from "@/components/dashboard/analyticals/EmployeeOperations/WorkingHoursSummary";

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
