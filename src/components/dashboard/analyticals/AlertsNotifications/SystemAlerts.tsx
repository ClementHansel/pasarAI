// src/components/dashboard/AlertsNotifications/SystemAlerts.tsx
import React, { useState, useEffect } from "react";

// Define the structure for system alerts
interface SystemAlert {
  id: string;
  message: string;
  type: "info" | "warning" | "error";
  timestamp: string;
}

const SystemAlerts: React.FC = () => {
  // State to manage system alerts
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);

  // Mock fetching system alerts (replace with real API call)
  useEffect(() => {
    // Example mock data
    const mockAlerts: SystemAlert[] = [
      {
        id: "1",
        message: "System maintenance scheduled for April 25th, 2025.",
        type: "info",
        timestamp: "2025-04-10T14:00:00Z",
      },
      {
        id: "2",
        message: "Security vulnerability detected in API endpoint.",
        type: "error",
        timestamp: "2025-04-09T09:00:00Z",
      },
    ];

    setAlerts(mockAlerts);
  }, []);

  // Function to determine the alert color based on type
  const getAlertColor = (type: "info" | "warning" | "error") => {
    switch (type) {
      case "info":
        return "bg-blue-100 text-blue-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">System Alerts</h2>
      <div className="space-y-4 mt-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg shadow-md ${getAlertColor(alert.type)}`}
          >
            <p className="text-lg font-semibold">{alert.message}</p>
            <p className="text-sm text-gray-500">
              Timestamp: {alert.timestamp}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemAlerts;
