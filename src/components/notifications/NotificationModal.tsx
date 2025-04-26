"use client";

import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Notification } from "@/types/notification"; // Assuming you have a Notification type

type NotificationModalProps = {
  notification: Notification; // The notification object passed as a prop
  onClose: () => void; // Function to close the modal
  markAsRead: (id: number) => void; // Function to update the notification read status
};

export default function NotificationModal({
  notification,
  onClose,
  markAsRead,
}: NotificationModalProps) {
  const [isRead, setIsRead] = useState(notification.read); // Track if the notification is read

  const handleMarkAsRead = () => {
    setIsRead(true); // Set the notification as read locally
    markAsRead(notification.id); // Mark it as read in the parent component or backend
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
          <div>
            <button
              onClick={handleMarkAsRead}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Mark as Read
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
