"use client";
import { useState, useEffect } from "react";
import { Notification } from "@/types/notification";
import { useNotifications } from "@/hooks/useNotifications";
import NotificationList from "@/components/notifications/NotificationList";
import NotificationDetail from "@/components/notifications/NotificationDetail";
import {
  fetchNotifications,
  markNotificationAsRead,
} from "@/services/notification/notificationService"; // Import the API service
import { NotificationProvider } from "@/context/NotificationContext";

export default function NotificationPage() {
  const accountId = "user123"; // Replace with actual account ID

  return (
    <NotificationProvider accountId={accountId}>
      <NotificationPageContent accountId={accountId} />
    </NotificationProvider>
  );
}

function NotificationPageContent({ accountId }: { accountId: string }) {
  const { notifications, loading, error, setNotifications } =
    useNotifications(accountId); // Using the hook

  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  // Fetch notifications when component mounts
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await fetchNotifications(accountId); // Fetch from backend API
        setNotifications(data.notifications); // Update notifications in the state
      } catch (err) {
        console.error("Error loading notifications:", err);
      }
    };

    loadNotifications();
  }, [accountId, setNotifications]); // Dependencies to trigger the effect

  // Handle marking a notification as read
  const handleMarkAsRead = async (id: string) => {
    try {
      await markNotificationAsRead(id); // Mark the notification as read in the backend
      // Directly update notifications to mark the notification as read
      const updatedNotifications = notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      );
      setNotifications(updatedNotifications); // Set the updated notifications
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
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
