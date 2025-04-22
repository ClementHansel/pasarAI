// src/components/dashboard/AlertsNotifications/NotificationsList.tsx
import React from "react";
import NotificationCard from "./NotificationCard";

// Define a type for the notification data
interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
}

interface NotificationsListProps {
  notifications: Notification[];
}

const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
}) => {
  const handleClick = (id: string) => {
    console.log("Notification clicked", id);
    // You can add logic to view more details or mark as read
  };

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          title={notification.title}
          message={notification.message}
          timestamp={notification.timestamp}
          onClick={() => handleClick(notification.id)}
        />
      ))}
    </div>
  );
};

export default NotificationsList;
