"use client";

import React, { createContext, useState, ReactNode } from "react";
import { Notification, NotificationContextType } from "@/types/notification";

// Create the NotificationContext
export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

type NotificationProviderProps = {
  children: ReactNode;
};

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]); // Store notifications
  const [unreadCount, setUnreadCount] = useState<number>(0); // Track unread notifications count

  // Add a new notification
  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [...prev, notification]);
    if (!notification.read) {
      setUnreadCount((prev) => prev + 1);
    }
  };

  // Mark a notification as read
  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
    setUnreadCount((prev) => prev - 1);
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
    setUnreadCount(0);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
