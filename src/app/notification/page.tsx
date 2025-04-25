"use client";

import { useState, useEffect } from "react";
import { Notification } from "@/types/notification";
import {
  fetchNotifications,
  markNotificationAsRead,
} from "@/lib/notification/notificationService";
import NotificationList from "@/components/notifications/NotificationList";
import NotificationDetail from "@/components/notifications/NotificationDetail";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  // Fetch notifications when the component mounts
  useEffect(() => {
    const notificationsData = fetchNotifications();
    setNotifications(notificationsData);
  }, []);

  // Handle marking a notification as read
  const handleMarkAsRead = (id: number) => {
    markNotificationAsRead(id);
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Handle selecting a notification to view its detail
  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    handleMarkAsRead(notification.id); // Mark as read when clicking
  };

  // Close the notification detail view
  const handleCloseDetail = () => {
    setSelectedNotification(null);
  };

  return (
    <div className="flex space-x-6 p-4">
      {/* Notification List on the left */}
      <div className="flex-1 max-w-sm">
        <h1 className="text-2xl font-semibold mb-4">Notifications</h1>
        <NotificationList
          notifications={notifications}
          onNotificationClick={handleNotificationClick}
        />
      </div>

      {/* Notification Detail on the right */}
      <div className="flex-1">
        {selectedNotification ? (
          <NotificationDetail
            notification={selectedNotification}
            onClose={handleCloseDetail}
          />
        ) : (
          <div className="text-gray-500">
            Select a notification to see details
          </div>
        )}
      </div>
    </div>
  );
}
