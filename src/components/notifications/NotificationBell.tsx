"use client";

import { useState, useRef, useEffect } from "react";
import { BellIcon } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import { useRouter } from "next/navigation";
import { Notification } from "@/types/notification";
import NotificationModal from "./NotificationModal";
import { useNotifications } from "@/hooks/useNotifications";

export default function NotificationBell() {
  // const accountId = session?.user?.accountId || ""; // Set it after session set up (andreas)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const bellRef = useRef<HTMLDivElement>(null);
  const { unreadCount, refreshUnreadCount } = useNotifications("buyer123"); // fix this after session is set (Andreas) and change it to (accountId)
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/notifications");
      if (!res.ok) throw new Error("Failed to fetch notifications");

      const data: Notification[] = await res.json();
      setNotifications(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Error: " + err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleViewAll = () => {
    router.push("/notifications");
    setIsOpen(false);
  };

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/notifications/${id}/mark-as-read`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to mark notification as read");

      const updatedNotifications = notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      );
      setNotifications(updatedNotifications);
      refreshUnreadCount?.(); // If you have refresh function in context
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.read) {
      await markAsRead(notification.id);
    }
    setSelectedNotification(notification);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={bellRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
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

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[320px] z-50">
          <NotificationDropdown
            notifications={notifications}
            onViewAll={handleViewAll}
            onClose={() => setIsOpen(false)}
            onNotificationClick={handleNotificationClick}
            markAsRead={markAsRead}
            loading={loading}
            error={error}
          />
        </div>
      )}

      {/* Modal */}
      {selectedNotification && (
        <NotificationModal
          notification={selectedNotification}
          onClose={() => setSelectedNotification(null)}
          markAsRead={markAsRead}
        />
      )}

      {/* Loading & Error - fallback if dropdown is closed */}
      {!isOpen && (
        <>
          {loading && (
            <div className="absolute top-0 left-0 right-0 text-center p-2 text-gray-600 text-sm">
              Loading notifications...
            </div>
          )}
          {error && (
            <div className="absolute top-0 left-0 right-0 text-center p-2 text-red-500 text-sm">
              {error}
            </div>
          )}
        </>
      )}
    </div>
  );
}
