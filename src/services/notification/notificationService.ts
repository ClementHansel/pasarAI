// src/services/notification/notificationService.ts

import { Notification } from "@/types/notification";

type HistoryResponse = {
  notifications: Notification[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

// Sends an email by calling App Router endpoint:
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
    // try to extract error from JSON, else fallback
    let errMsg: string;
    try {
      const payload = await res.json();
      errMsg = payload.error ?? res.statusText;
    } catch {
      errMsg = res.statusText;
    }
    throw new Error(errMsg);
  }
}

// Creates a new notification (and sends it via email or push) by calling:
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
    let errMsg: string;
    try {
      const payload = await res.json();
      errMsg = payload.error ?? res.statusText;
    } catch {
      errMsg = res.statusText;
    }
    throw new Error(errMsg);
  }
  const { notification } = (await res.json()) as { notification: Notification };
  return notification as Notification;
}

// Fetches the notification history (paginated) for one account:

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
    let errMsg: string;
    try {
      const payload = await res.json();
      errMsg = payload.error ?? res.statusText;
    } catch {
      errMsg = res.statusText;
    }
    throw new Error(errMsg);
  }
  return (await res.json()) as HistoryResponse;
}

// Marks a single notification as read:

export async function markNotificationAsRead(
  notificationId: string
): Promise<Notification> {
  const res = await fetch(`/api/notification/${notificationId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ read: true }),
  });
  if (!res.ok) {
    let errMsg: string;
    try {
      const payload = await res.json();
      errMsg = payload.error ?? res.statusText;
    } catch {
      errMsg = res.statusText;
    }
    throw new Error(errMsg);
  }
  const { notification } = (await res.json()) as { notification: Notification };
  return notification as Notification;
}

// Updates notification:

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
    let errMsg: string;
    try {
      const payload = await res.json();
      errMsg = payload.error ?? res.statusText;
    } catch {
      errMsg = res.statusText;
    }
    throw new Error(errMsg);
  }
  const { notification } = (await res.json()) as { notification: Notification };
  return notification as Notification;
}
