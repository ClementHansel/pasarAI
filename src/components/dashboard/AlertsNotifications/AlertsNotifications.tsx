// src/components/dashboard/AlertsNotifications/AlertsNotifications.tsx
import React, { useState, useEffect } from "react";
import AlertsList from "./AlertsList";
import NotificationsList from "./NotificationsList";
import NotificationSettings from "./NotificationSettings";

interface Alert {
  id: string;
  message: string;
  createdAt: string;
  type: "info" | "warning" | "error";
}

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
}

// Simulating fetching alerts and notifications data
const fetchAlerts = (): Alert[] => [
  {
    id: "1",
    message: "Server downtime scheduled",
    createdAt: "2023-04-01",
    type: "warning",
  },
  {
    id: "2",
    message: "New user registration",
    createdAt: "2023-04-02",
    type: "info",
  },
];

const fetchNotifications = (): Notification[] => [
  {
    id: "1",
    title: "Order shipped",
    message: "Your order #123 has been shipped.",
    timestamp: "2023-04-02",
  },
  {
    id: "2",
    title: "New message",
    message: "You have a new message from support.",
    timestamp: "2023-04-03",
  },
];

const AlertsNotifications: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Simulate fetching data
    setAlerts(fetchAlerts());
    setNotifications(fetchNotifications());
  }, []);

  return (
    <div className="space-y-8">
      <AlertsList alerts={alerts} />
      <NotificationsList notifications={notifications} />
      <NotificationSettings />
    </div>
  );
};

export default AlertsNotifications;
