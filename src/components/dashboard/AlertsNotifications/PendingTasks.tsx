// src/components/dashboard/AlertsNotifications/PendingTasks.tsx
import React, { useState, useEffect } from "react";

// Define the structure for Pending Tasks
interface PendingTask {
  id: string;
  task: string;
  assignedTo: string;
  deadline: string;
  completed: boolean;
}

const PendingTasks: React.FC = () => {
  // State to manage the pending tasks
  const [tasks, setTasks] = useState<PendingTask[]>([]);

  // Mock fetching data for pending tasks (replace with real API call)
  useEffect(() => {
    // Example mock data
    const mockData: PendingTask[] = [
      {
        id: "1",
        task: "Complete quarterly report",
        assignedTo: "John Doe",
        deadline: "2025-04-20",
        completed: false,
      },
      {
        id: "2",
        task: "Update website design",
        assignedTo: "Jane Smith",
        deadline: "2025-04-15",
        completed: false,
      },
    ];

    setTasks(mockData);
  }, []);

  // Handle marking a task as completed
  const markAsCompleted = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  };

  return (
    <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-yellow-800">Pending Tasks</h2>
      <div className="space-y-4 mt-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 rounded-lg ${
              task.completed ? "bg-green-100" : "bg-yellow-200"
            } shadow-md`}
          >
            <p className="text-lg font-semibold text-yellow-900">{task.task}</p>
            <p className="text-sm text-gray-500">
              Assigned to: {task.assignedTo}
            </p>
            <p className="text-sm text-gray-500">Deadline: {task.deadline}</p>
            {!task.completed && (
              <button
                onClick={() => markAsCompleted(task.id)}
                className="mt-2 text-white bg-green-600 hover:bg-green-700 py-1 px-3 rounded-md"
              >
                Mark as Completed
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingTasks;
