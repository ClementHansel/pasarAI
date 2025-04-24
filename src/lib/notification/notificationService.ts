import { Notification } from "@/types/notification";

// A mock function to simulate fetching notifications
export const fetchNotifications = (): Notification[] => {
  // You can replace this mock data with actual API calls to fetch notifications
  return [
    {
      id: 1,
      title: "New Comment",
      message: "Someone commented on your post.",
      content: "Detailed information about the comment made on your post.",
      timestamp: new Date().toISOString(),
      read: false,
    },
    {
      id: 2,
      title: "New Like",
      message: "Your post was liked by someone.",
      content:
        "Detailed information about who liked your post and the context of the like.",
      timestamp: new Date().toISOString(),
      read: false,
    },
    {
      id: 3,
      title: "System Update",
      message: "A new system update is available.",
      content:
        "Detailed information about the new system update and what has changed.",
      timestamp: new Date().toISOString(),
      read: true,
    },
  ];
};

// A mock function to simulate marking a notification as read
export const markNotificationAsRead = (id: number): void => {
  // In a real app, you'd update the notification's `read` status in the backend.
  // Here, we'll just log the action.
  console.log(`Notification with ID: ${id} has been marked as read.`);
};

// A mock function to simulate deleting a notification
export const deleteNotification = (id: number): void => {
  // In a real app, you'd make an API call to delete the notification.
  console.log(`Notification with ID: ${id} has been deleted.`);
};
