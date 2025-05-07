// src/components/dashboard/AlertsNotifications/CriticalAlerts.tsx
import React, { useState, useEffect } from "react";

// Define the structure for Critical Alerts
interface CriticalAlert {
  id: string;
  message: string;
  timestamp: string;
  resolved: boolean;
}

const CriticalAlerts: React.FC = () => {
  // State to manage the critical alerts
  const [alerts, setAlerts] = useState<CriticalAlert[]>([]);

  // Mock fetching data for critical alerts (replace with real API call)
  useEffect(() => {
    // Example mock data
    const mockData: CriticalAlert[] = [
      {
        id: "1",
        message: "Security breach detected in system X.",
        timestamp: new Date().toISOString(),
        resolved: false,
      },
      {
        id: "2",
        message: "Server Y is down.",
        timestamp: new Date().toISOString(),
        resolved: false,
      },
    ];

    setAlerts(mockData);
  }, []);

  // Handle resolving an alert (this could be linked to an API for real systems)
  const resolveAlert = (id: string) => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === id ? { ...alert, resolved: true } : alert
      )
    );
  };

  return (
    <div className="bg-red-100 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-red-800">Critical Alerts</h2>
      <div className="space-y-4 mt-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg ${
              alert.resolved ? "bg-green-100" : "bg-red-200"
            } shadow-md`}
          >
            <p className="text-lg font-semibold text-red-900">
              {alert.message}
            </p>
            <p className="text-sm text-gray-500">
              Timestamp: {alert.timestamp}
            </p>
            {!alert.resolved && (
              <button
                onClick={() => resolveAlert(alert.id)}
                className="mt-2 text-white bg-green-600 hover:bg-green-700 py-1 px-3 rounded-md"
              >
                Mark as Resolved
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CriticalAlerts;
