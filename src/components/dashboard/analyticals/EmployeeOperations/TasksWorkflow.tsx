// src/components/dashboard/analyticals/EmployeeOperations/TasksWorkflow.tsx

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TasksWorkflowData } from "@/types/analytical/employeeInsights";

interface TasksWorkflowProps {
  data?: TasksWorkflowData[];
}

const TasksWorkflow: React.FC<TasksWorkflowProps> = ({ data }) => {
  return (
    <Card className="w-full rounded-2xl shadow-md">
      <CardContent className="p-4 space-y-4">
        <h2 className="text-lg font-semibold">Employee Tasks & Workflow</h2>
        <div className="space-y-3">
          {data && data.length > 0 ? (
            data.map((task) => (
              <div key={task.id}>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{task.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {task.status}
                  </span>
                </div>
                <Progress value={task.progress} className="h-2" />
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No tasks available.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksWorkflow;
