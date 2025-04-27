import { useState, useEffect, useContext } from "react";
import { NotificationContext } from "@/context/NotificationContext";
import { NotificationContextType, Notification } from "@/types/notification";
import { fetchNotifications } from "@/services/notification/notificationService";

// Custom hook to use the NotificationContext and handle fetching notifications
export const useNotifications = (
  accountId: string
): NotificationContextType & {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
} => {
  const context = useContext(NotificationContext); // Access the context for global state
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Throw error if context is not available
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }

  const {
    notifications: globalNotifications,
    setNotifications: setGlobalNotifications,
  } = context;

  // Fetch notifications when the accountId changes
  useEffect(() => {
    const fetchNotificationsData = async () => {
      setLoading(true);
      try {
        const notificationsData = await fetchNotifications(accountId); // Use accountId to fetch notifications
        setNotifications(notificationsData);
        setError(null); // Clear error if fetching is successful
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setError("Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    };

    if (accountId) {
      fetchNotificationsData();
    }
  }, [accountId]);

  // Combine fetched notifications with global notifications in context
  const combinedNotifications = [...globalNotifications, ...notifications];

  // Return context along with the fetched notifications data
  return {
    ...context, // Include the context data (e.g., global notification state)
    notifications: combinedNotifications, // Return combined notifications
    loading,
    error,
    setNotifications: setGlobalNotifications, // Expose the global setNotifications function
  };
};
