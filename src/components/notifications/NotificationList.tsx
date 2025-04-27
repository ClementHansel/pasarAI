import React, { useEffect, useState, useCallback } from "react";
import { Notification } from "@/types/notification";
import NotificationItem from "@/components/notifications/NotificationItem";

type NotificationListProps = {
  accountId: string; // Account ID passed from parent to fetch the notifications
  notifications: Notification[];
  onNotificationClick: (notification: Notification) => void; // Function to handle notification click
};

export default function NotificationList({
  accountId,
  onNotificationClick,
}: NotificationListProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Memoize the fetchNotifications function using useCallback
  const fetchNotifications = useCallback(async () => {
    setIsLoading(true); // Start loading
    setError(null); // Reset previous errors

    try {
      const response = await fetch(
        `/api/notification/history?accountId=${accountId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch notifications.");
      }
      const data = await response.json();
      setNotifications(data.notifications); // Update notifications state
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(`Failed to load notifications: ${error.message}`);
      } else {
        setError("Failed to load notifications. Please try again later.");
      }
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false); // End loading
    }
  }, [accountId]); // Include accountId as a dependency

  // Fetch notifications when the component mounts or when accountId changes
  useEffect(() => {
    fetchNotifications(); // Call the function to fetch notifications
  }, [accountId, fetchNotifications]); // Add fetchNotifications as a dependency

  // Retry button handler
  const handleRetry = () => {
    setError(null); // Reset error message
    fetchNotifications(); // Retry fetching notifications
  };

  return (
    <div className="space-y-2">
      {isLoading && <p className="text-blue-500">Loading notifications...</p>}
      {/* Loading indicator */}
      {error && (
        <div>
          <p className="text-red-500">{error}</p>
          <button
            onClick={handleRetry}
            className="text-blue-500 hover:underline"
          >
            Retry
          </button>
        </div>
      )}
      {/* Error message with Retry button */}
      {notifications.length === 0 && !isLoading && !error ? (
        <p className="text-gray-500">No notifications available.</p>
      ) : (
        notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onMarkAsRead={onNotificationClick}
          /> // Pass the onClick handler
        ))
      )}
    </div>
  );
}
