export type NotificationStatus = "read" | "unread";

export interface Notification {
  id: string; // Unique identifier for each notification
  title: string;
  message: string; // The notification message content
  content: string;
  timestamp: string; // The timestamp when the notification was created (ISO string)
  read: boolean; // Whether the notification has been read or not
  recipientEmail: string;
}

export interface NotificationContextType {
  notifications: Notification[]; // Array of all notifications
  unreadCount: number; // The count of unread notifications
  addNotification: (notification: Notification) => void; // Function to add a new notification
  markAsRead: (id: string) => void; // Function to mark a notification as read
  markAllAsRead: () => void; // Function to mark all notifications as read
  setNotifications: (notifications: Notification[]) => void;
  refreshUnreadCount: () => void;
}
