// src/services/notification/notificationService.ts

import { Notification } from "@/types/notification";

export type HistoryResponse = {
  notifications: Notification[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

// Async Email Queue
export async function queueEmail(
  subject: string,
  recipient: string,
  text: string
): Promise<{ success: boolean; message?: string }> {
  const res = await fetch("/api/notification/queueEmail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subject, recipient, text }),
  });

  if (!res.ok) {
    const errMsg = await extractError(res);
    logNotificationActivity("email-queue-failed", {
      subject,
      recipient,
      error: errMsg,
    });
    throw new Error(errMsg);
  }

  const result = await res.json();
  logNotificationActivity("email-queued", { subject, recipient });
  return result;
}

// Used by admin dashboard or CRON process
export async function processQueuedEmails(): Promise<{ processed: number }> {
  const res = await fetch("/api/notification/processQueue", {
    method: "POST",
  });

  if (!res.ok) {
    const errMsg = await extractError(res);
    logNotificationActivity("queue-process-failed", { error: errMsg });
    throw new Error(errMsg);
  }

  const result = await res.json();
  logNotificationActivity("queue-processed", { ...result });
  return result;
}

// Core Email Sender
export async function sendEmail(
  subject: string,
  recipient: string,
  text: string
): Promise<void> {
  const res = await fetch("/api/notification/sendEmail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subject, recipient, text }),
  });

  if (!res.ok) {
    const errMsg = await extractError(res);
    logNotificationActivity("email-failed", {
      subject,
      recipient,
      error: errMsg,
    });
    throw new Error(errMsg);
  }

  logNotificationActivity("email-sent", { subject, recipient });
}

// Create Notification
export async function sendNotification(
  type: "email" | "push",
  accountId: string,
  title: string,
  message: string
): Promise<Notification> {
  const res = await fetch("/api/notification", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ accountId, type, title, message }),
  });

  if (!res.ok) {
    const errMsg = await extractError(res);
    logNotificationActivity("notification-send-failed", {
      type,
      accountId,
      title,
      error: errMsg,
    });
    throw new Error(errMsg);
  }

  const { notification } = (await res.json()) as { notification: Notification };
  logNotificationActivity("notification-sent", { type, accountId, title });
  return notification;
}

// Fetch Notifications
export async function fetchNotifications(
  accountId: string,
  page = 1,
  limit = 20
): Promise<HistoryResponse> {
  const url = `/api/notification/history?accountId=${encodeURIComponent(
    accountId
  )}&page=${page}&limit=${limit}`;
  const res = await fetch(url);

  if (!res.ok) {
    const errMsg = await extractError(res);
    throw new Error(errMsg);
  }

  return (await res.json()) as HistoryResponse;
}

// Mark Notification as Read
export async function markNotificationAsRead(
  notificationId: string
): Promise<Notification> {
  const res = await fetch(`/api/notification/${notificationId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ read: true }),
  });

  if (!res.ok) {
    const errMsg = await extractError(res);
    throw new Error(errMsg);
  }

  const { notification } = (await res.json()) as { notification: Notification };
  return notification;
}

// Update Notification Read Status
export async function updateNotificationStatus(
  notificationId: string,
  read: boolean
): Promise<Notification> {
  const res = await fetch(`/api/notification/${notificationId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ read }),
  });

  if (!res.ok) {
    const errMsg = await extractError(res);
    throw new Error(errMsg);
  }

  const { notification } = (await res.json()) as { notification: Notification };
  return notification;
}

function logNotificationActivity(event: string, data: Record<string, unknown>) {
  console.log(`[NotificationLog] ${event}:`, data);

  // send to backend log service:
  fetch("/api/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, data, timestamp: new Date().toISOString() }),
  });
}

// Helper: Extract readable error
async function extractError(res: Response): Promise<string> {
  try {
    const payload = await res.json();
    return payload.error ?? res.statusText;
  } catch {
    return res.statusText;
  }
}
