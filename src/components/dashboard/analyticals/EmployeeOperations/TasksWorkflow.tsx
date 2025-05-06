import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Task {
  id: number;
  title: string;
  progress: number;
  status: "Not Started" | "In Progress" | "Completed";
}

const tasks: Task[] = [
  {
    id: 1,
    title: "Onboard New Developer",
    progress: 80,
    status: "In Progress",
  },
  { id: 2, title: "Quarterly Review Prep", progress: 100, status: "Completed" },
  { id: 3, title: "Update Company Wiki", progress: 30, status: "In Progress" },
];

const TasksWorkflow = () => {
  return (
    <Card className="w-full shadow-md">
      <CardContent className="p-4 space-y-4">
        <h2 className="text-lg font-semibold">Employee Tasks & Workflow</h2>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id}>
              <div className="flex justify-between items-center">
                <span>{task.title}</span>
                <span className="text-sm text-muted-foreground">
                  {task.status}
                </span>
              </div>
              <Progress value={task.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksWorkflow;
