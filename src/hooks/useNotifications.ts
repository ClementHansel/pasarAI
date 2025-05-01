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
  const [notifications, setNotifications] = useState<Notification[]>([]); // Local state for fetched notifications
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

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
      setLoading(true); // Start loading
      try {
        const response = await fetchNotifications(accountId); // Fetch notifications from the backend
        setNotifications(response.notifications); // Update local state with fetched notifications
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setError("Failed to fetch notifications"); // Set error if fetching fails
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (accountId) {
      fetchNotificationsData(); // Fetch notifications when accountId is available
    }
  }, [accountId]); // Dependency array ensures re-fetch when accountId changes

  // Combine fetched notifications with global notifications from context
  const combinedNotifications = [...globalNotifications, ...notifications];

  // Return context data along with the fetched notifications
  return {
    ...context, // Include global notification state
    notifications: combinedNotifications, // Return the combined notifications
    loading,
    error,
    setNotifications: setGlobalNotifications, // Expose global setNotifications to allow updates
  };
};
