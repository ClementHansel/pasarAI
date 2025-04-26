"use client";

import { useState, useRef, useEffect } from "react";
import { BellIcon } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";

import { useRouter } from "next/navigation";
import { Notification } from "@/types/notification";
import NotificationModal from "./NotificationModal"; // Import the modal
import { useNotifications } from "@/hooks/useNotifications";

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null); // To store the selected notification for modal
  const bellRef = useRef<HTMLDivElement>(null);
  const { unreadCount } = useNotifications(); // Get unread count from context
  const [notifications, setNotifications] = useState<Notification[]>([]); // State to hold notifications
  const router = useRouter();

  // Function to handle "View All" button click
  const handleViewAll = () => {
    router.push("/notifications"); // Navigate to the full notifications page
  };

  // Fetch notifications when the component mounts
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/notifications"); // Fetch notifications from API
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const data = await response.json(); // Assuming API returns an array of notifications
        setNotifications(data); // Set notifications to state
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();

    // Optionally, you can set up polling to refresh notifications every 5 minutes
    const interval = setInterval(fetchNotifications, 5 * 60 * 1000); // Refresh every 5 minutes

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(event.target as Node)) {
        setIsOpen(false); // Close the dropdown when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Function to handle clicking a notification (mark as read and show details)
  const handleNotificationClick = (notification: Notification) => {
    // Mark notification as read (update state and send to server if needed)
    const updatedNotifications = notifications.map((notif) =>
      notif.id === notification.id ? { ...notif, read: true } : notif
    );
    setNotifications(updatedNotifications); // Update local state

    // Optionally, send an API request to mark the notification as read on the server

    setSelectedNotification(notification); // Set the selected notification for the modal
  };

  // Mark a notification as read (parent handler)
  const markAsRead = (id: number) => {
    const updatedNotifications = notifications.map((notif) =>
      notif.id === id ? { ...notif, read: true } : notif
    );
    setNotifications(updatedNotifications); // Update local state to reflect the change
  };

  return (
    <div className="relative" ref={bellRef}>
      <button
        onClick={() => setIsOpen(!isOpen)} // Toggle the dropdown visibility
        className="relative p-2 rounded-full hover:bg-gray-100 transition"
        aria-label="Notifications"
      >
        <BellIcon className="w-6 h-6 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[320px] z-50">
          <NotificationDropdown
            notifications={notifications} // Passing fetched notifications
            onViewAll={handleViewAll} // View all button click handler
            onClose={() => setIsOpen(false)} // Close dropdown function
            onNotificationClick={handleNotificationClick} // Pass the handler for clicking on notifications
            markAsRead={markAsRead} // Pass markAsRead function
          />
        </div>
      )}

      {/* Modal to show notification details when clicked */}
      {selectedNotification && (
        <NotificationModal
          notification={selectedNotification}
          onClose={() => setSelectedNotification(null)} // Close the modal by clearing selected notification
          markAsRead={markAsRead}
        />
      )}
    </div>
  );
}
