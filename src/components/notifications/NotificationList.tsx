import { Notification } from "@/types/notification";
import NotificationItem from "./NotificationItem";

type NotificationListProps = {
  notifications: Notification[]; // List of notifications to display
  onNotificationClick: (notification: Notification) => void; // Function to handle notification click
};

export default function NotificationList({
  notifications,
  onNotificationClick,
}: NotificationListProps) {
  return (
    <div className="space-y-2">
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications available.</p>
      ) : (
        notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClick={onNotificationClick} // Pass the click handler to each notification item
          />
        ))
      )}
    </div>
  );
}
