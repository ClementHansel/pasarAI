"use client";
import { useState } from "react";
import { Notification } from "@/types/notification";
import { useNotifications } from "@/hooks/useNotifications";
import NotificationList from "@/components/notifications/NotificationList";
import NotificationDetail from "@/components/notifications/NotificationDetail";

export default function NotificationPage() {
  const accountId = "user123"; // Replace with actual account ID

  const { notifications, loading, error, markAsRead, setNotifications } =
    useNotifications(accountId);

  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  // Handle marking a notification as read
  const handleMarkAsRead = (id: string) => {
    markAsRead(id); // Pass a string ID

    // Directly update notifications to mark the notification as read
    const updatedNotifications = notifications.map((notif) =>
      notif.id === id ? { ...notif, read: true } : notif
    );
    setNotifications(updatedNotifications); // Set the updated notifications
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
        {loading && <div className="text-blue-500">Loading...</div>}{" "}
        {/* Show loading spinner */}
        {error && <div className="text-red-500">{error}</div>}{" "}
        {/* Display error if exists */}
        <NotificationList
          accountId={accountId} // Pass accountId here
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
