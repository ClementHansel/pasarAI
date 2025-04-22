// src/components/dashboard/AlertsNotifications/NotificationCard.tsx
import React from "react";

interface NotificationCardProps {
  title: string;
  message: string;
  timestamp: string;
  onClick: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  message,
  timestamp,
  onClick,
}) => {
  return (
    <div
      className="p-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
      onClick={onClick}
    >
      <h4 className="text-md font-semibold">{title}</h4>
      <p className="text-sm text-gray-500">{message}</p>
      <span className="text-xs text-gray-400">{timestamp}</span>
    </div>
  );
};

export default NotificationCard;
