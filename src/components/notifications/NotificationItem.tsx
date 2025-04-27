import React, { useState } from "react";
import { Notification } from "@/types/notification";

type NotificationItemProps = {
  notification: Notification;
  onMarkAsRead: (notification: Notification) => void;
};

export default function NotificationItem({
  notification,
  onMarkAsRead,
}: NotificationItemProps) {
  const [isLoading, setIsLoading] = useState(false); // Track loading state when marking as read
  const [error, setError] = useState<string | null>(null); // Track errors during update

  // Mark notification as read
  const handleMarkAsRead = async () => {
    if (isLoading) return;

    setIsLoading(true); // Set loading to true
    setError(null); // Reset any previous errors

    try {
      // Send PATCH request to update the notification status
      const response = await fetch(`/api/notification/${notification.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read: true }), // Update the read status
      });

      if (!response.ok) {
        throw new Error("Failed to mark notification as read.");
      }

      // Optimistically update the UI
      onMarkAsRead({ ...notification, read: true }); // Pass the updated notification to the parent
    } catch (error) {
      setError("Failed to mark notification as read. Please try again.");
      console.error("Error marking notification as read:", error);
    } finally {
      setIsLoading(false); // Reset loading state after the operation
    }
  };

  return (
    <div
      className={`p-2 cursor-pointer ${
        notification.read ? "text-gray-500" : "text-red-600"
      }`}
      onClick={handleMarkAsRead} // Trigger mark as read on click
    >
      <p className="font-semibold">{notification.message}</p>
      <p className="text-sm text-gray-400">
        {new Date(notification.timestamp).toLocaleString()}
      </p>

      {/* Loading state feedback */}
      {isLoading && <span className="text-sm text-blue-500">Loading...</span>}

      {/* Error message feedback */}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
