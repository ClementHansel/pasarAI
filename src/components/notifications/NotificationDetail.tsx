import { Notification } from "@/types/notification";
import { XIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import React, { useState } from "react";

type NotificationDetailProps = {
  notification: Notification;
  onClose?: () => void;
  onMarkRead?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export default function NotificationDetail({
  notification,
  onClose,
  onMarkRead,
  onDelete,
}: NotificationDetailProps) {
  const { id, title, content, timestamp, read } = notification;
  const [isMarkingRead, setIsMarkingRead] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMarkRead = async (id: string) => {
    if (onMarkRead) {
      setIsMarkingRead(true);
      setError(null);
      try {
        // Call API to mark the notification as read
        const response = await fetch(`/api/notification/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ read: true }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to mark notification as read");
        }

        // Trigger callback to update the state in parent component
        onMarkRead(id);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred while marking as read.");
        }
      } finally {
        setIsMarkingRead(false);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (onDelete) {
      setIsDeleting(true);
      setError(null);
      try {
        // Call API to delete the notification
        const response = await fetch(`/api/notification/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete notification");
        }

        // Trigger callback to update the state in parent component
        onDelete(id);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(
            "An unknown error occurred while deleting the notification."
          );
        }
      } finally {
        setIsDeleting(false);
      }
    }
  };

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

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Actions */}
      <div className="flex gap-2">
        {!read && onMarkRead && (
          <button
            onClick={() => handleMarkRead(id)}
            disabled={isMarkingRead}
            className={`px-3 py-1 ${
              isMarkingRead ? "bg-gray-400" : "bg-blue-500"
            } text-white rounded hover:bg-blue-600 text-sm`}
          >
            {isMarkingRead ? "Marking as Read..." : "Mark as Read"}
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => handleDelete(id)}
            disabled={isDeleting}
            className={`px-3 py-1 ${
              isDeleting ? "bg-gray-400" : "bg-red-500"
            } text-white rounded hover:bg-red-600 text-sm`}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>
    </div>
  );
}
