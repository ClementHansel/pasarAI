// src/components/dashboard/AlertsNotifications/AlertsList.tsx
import React from "react";

// Define a type for alert data
interface Alert {
  id: string;
  message: string;
  createdAt: string;
  type: "info" | "warning" | "error";
}

interface AlertsListProps {
  alerts: Alert[];
}

const AlertsList: React.FC<AlertsListProps> = ({ alerts }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">Alerts</h3>
      <ul className="mt-4 space-y-2">
        {alerts.map((alert) => (
          <li key={alert.id} className={`alert-${alert.type} p-2 rounded`}>
            <p>{alert.message}</p>
            <span className="text-sm text-gray-500">{alert.createdAt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertsList;
