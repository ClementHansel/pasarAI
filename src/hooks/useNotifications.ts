import { NotificationContextType } from "@/types/notification";
import { useContext } from "react";
import { NotificationContext } from "@/context/NotificationContext";

// Custom hook to use the NotificationContext
export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};
