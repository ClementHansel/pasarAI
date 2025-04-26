import { Notification } from "@/types/notification";
import { XIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type NotificationDetailProps = {
  notification: Notification;
  onClose?: () => void;
  onMarkRead?: (id: number) => void;
  onDelete?: (id: number) => void;
};

export default function NotificationDetail({
  notification,
  onClose,
  onMarkRead,
  onDelete,
}: NotificationDetailProps) {
  const { id, title, content, timestamp, read } = notification;

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close notification"
            title="Close notification"
          >
            <XIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Timestamp */}
      <p className="text-sm text-gray-500">
        {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
      </p>

      {/* Content */}
      <div className="text-gray-800 whitespace-pre-line">{content}</div>

      {/* Actions */}
      <div className="flex gap-2">
        {!read && onMarkRead && (
          <button
            onClick={() => onMarkRead(id)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Mark as Read
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
