import { Notification } from "@/types/notification";

type NotificationItemProps = {
  notification: Notification;
  onClick: (notification: Notification) => void; // Function to handle notification click
};

export default function NotificationItem({
  notification,
  onClick,
}: NotificationItemProps) {
  return (
    <div
      className={`p-2 cursor-pointer ${
        notification.read ? "text-gray-500" : "text-red-600"
      }`}
      onClick={() => onClick(notification)} // Handle notification click
    >
      <p className="font-semibold">{notification.message}</p>
      <p className="text-sm text-gray-400">
        {new Date(notification.timestamp).toLocaleString()}
      </p>
    </div>
  );
}
