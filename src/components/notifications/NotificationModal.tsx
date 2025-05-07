"use client";

import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Notification } from "@/types/notification";

type NotificationModalProps = {
  notification: Notification; // The notification object passed as a prop
  onClose: () => void; // Function to close the modal
  markAsRead: (id: string) => void; // Function to update the notification read status
};

export default function NotificationModal({
  notification,
  onClose,
  markAsRead,
}: NotificationModalProps) {
  const [isRead, setIsRead] = useState(notification.read); // Track if the notification is read
  const [isLoading, setIsLoading] = useState(false); // Track loading state for marking as read
  const [error, setError] = useState<string | null>(null); // Error state

  const handleMarkAsRead = async () => {
    if (isLoading || isRead) return; // Prevent re-triggering if already processing or already read
    setIsLoading(true);
    setError(null);

    try {
      // Make API request to mark notification as read
      const response = await fetch(`/api/notification/${notification.id}`, {
        method: "PATCH",
        body: JSON.stringify({ read: true }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }

      // Update local state to reflect the change
      setIsRead(true);
      markAsRead(notification.id); // Pass updated id to parent component to refresh the notification list
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred while marking as read.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Notification Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-3">
          <p className="font-semibold text-lg">{notification.message}</p>
          <p className="text-sm text-gray-500">
            Timestamp: {new Date(notification.timestamp).toLocaleString()}
          </p>
          <p className={`text-sm ${isRead ? "text-gray-500" : "text-red-600"}`}>
            Status: {isRead ? "Read" : "Unread"}
          </p>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Mark as Read Button */}
          <div>
            <button
              onClick={handleMarkAsRead}
              disabled={isLoading || isRead}
              className={`mt-4 px-4 py-2 ${
                isLoading || isRead ? "bg-gray-400" : "bg-blue-600"
              } text-white rounded-md hover:bg-blue-700`}
            >
              {isLoading ? "Marking as Read..." : "Mark as Read"}
            </button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}
