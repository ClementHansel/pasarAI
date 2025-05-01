"use client";

import { useState, useEffect, useRef } from "react";
import { Notification } from "@/types/notification";
import NotificationDetail from "./NotificationDetail";
import { formatDistanceToNow } from "date-fns";

type NotificationDropdownProps = {
  notifications: Notification[];
  onViewAll: () => void;
  onClose?: () => void;
  markAsRead: (id: string) => Promise<void>; // Function to mark a notification as read
  onNotificationClick: (notification: Notification) => void;
  loading: boolean;
  error: string | null;
};

export default function NotificationDropdown({
  notifications,
  onViewAll,
  onClose,
  onNotificationClick,
  markAsRead,
  error,
}: NotificationDropdownProps) {
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [loadingNotification, setLoadingNotification] = useState<string | null>(
    null
  ); // Track which notification is being marked as read

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter unread notifications and sort them by the most recent
  const unreadNotifications = notifications
    .filter((n) => !n.read)
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

  // Handle notification click to mark it as read and open details modal
  const handleNotificationClick = async (notification: Notification) => {
    if (loadingNotification === notification.id) return; // Prevent clicking if already processing

    setLoadingNotification(notification.id); // Set loading state for this notification

    try {
      // Make API request to mark notification as read
      const response = await fetch(`/api/notification/${notification.id}`, {
        method: "PATCH",
        body: JSON.stringify({ read: true }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }

      markAsRead(notification.id); // Update state in parent component
      setSelectedNotification(notification); // Show the notification details in modal
      onNotificationClick(notification); // Notify parent to handle further actions
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error while marking as read:", error.message);
      } else {
        console.error("An unknown error occurred while marking as read.");
      }
    } finally {
      setLoadingNotification(null); // Reset loading state after the operation
    }
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose?.(); // Close dropdown when clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-96 bg-white shadow-lg rounded-lg z-50 border max-h-[400px] overflow-y-auto"
    >
      <div className="p-4 font-semibold text-gray-800 border-b">
        Notifications
      </div>

      {unreadNotifications.length === 0 ? (
        <div className="p-4 text-gray-500 text-sm">No new notifications</div>
      ) : (
        <ul>
          {unreadNotifications.map((notif) => (
            <li
              key={notif.id}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b"
              onClick={() => handleNotificationClick(notif)} // Handle notification click
            >
              <div className="font-medium">{notif.title}</div>
              <div className="text-sm text-gray-500 truncate">
                {notif.message}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {formatDistanceToNow(new Date(notif.timestamp), {
                  addSuffix: true,
                })}
              </div>

              {/* Show loading state if this notification is being processed */}
              {loadingNotification === notif.id && (
                <div className="text-xs text-blue-500 mt-1">
                  Marking as read...
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Error Handling */}
      {error && <div className="p-4 text-red-500 text-sm">{error}</div>}

      <div className="p-2 border-t text-center">
        <button
          onClick={onViewAll}
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          View All
        </button>
      </div>

      {/* Display Notification Detail Modal */}
      {selectedNotification && (
        <NotificationDetail
          notification={selectedNotification}
          onClose={() => setSelectedNotification(null)} // Close modal when clicking "Close"
        />
      )}
    </div>
  );
}
