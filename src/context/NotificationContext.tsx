"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { Notification, NotificationContextType } from "@/types/notification";
import {
  fetchNotifications,
  HistoryResponse,
  updateNotificationStatus,
} from "@/services/notification/notificationService";

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export type NotificationProviderProps = {
  children: ReactNode;
  accountId: string;
};

export const NotificationProvider = ({
  children,
  accountId,
}: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // Fetch notifications on load
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const response: HistoryResponse = await fetchNotifications(accountId);
        const fetchedNotifications = response.notifications;

        setNotifications(fetchedNotifications);
        setUnreadCount(
          fetchedNotifications.filter((notif: Notification) => !notif.read)
            .length
        );
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    if (accountId) {
      loadNotifications();
    }
  }, [accountId]);

  // Function to refresh unread count
  const refreshUnreadCount = () => {
    const unread = notifications.filter((notif) => !notif.read).length;
    setUnreadCount(unread);
  };

  // Add a new notification
  const addNotification = async (notification: Notification) => {
    setNotifications((prev) => [...prev, notification]);
    if (!notification.read) {
      setUnreadCount((prev) => prev + 1);
    }

    // Send email
    try {
      const response = await fetch("/api/notification/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: notification.title,
          recipient: notification.recipientEmail,
          text: notification.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email notification");
      }
    } catch (error) {
      console.error("Error sending email notification:", error);
    }
  };

  // Mark one notification as read
  const markAsRead = useCallback(async (id: string) => {
    setNotifications((prev) =>
      prev.map((notif: Notification) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount((prev) => prev - 1);

    try {
      await updateNotificationStatus(id, true);
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
  }, []);

  // Mark all notifications as read
  const markAllAsRead = async () => {
    setNotifications((prev) =>
      prev.map((notif: Notification) => ({ ...notif, read: true }))
    );
    setUnreadCount(0);

    try {
      await updateNotificationStatus("all", true);
    } catch (error) {
      console.error("Error updating all notification statuses:", error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        setNotifications,
        refreshUnreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
