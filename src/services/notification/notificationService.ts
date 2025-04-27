import nodemailer from "nodemailer";
import { getAccountById } from "../account/accountService";

// Create a transporter for Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ACCOUNT,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send email
export async function sendEmail(
  subject: string,
  recipient: string,
  text: string
) {
  const mailOptions = {
    from: process.env.EMAIL_ACCOUNT,
    to: recipient,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email sending failed");
  }
}

// Send Notification (either email or push)
export async function sendNotification(
  type: "email" | "push",
  accountId: string,
  title: string,
  message: string
) {
  if (type === "email") {
    const account = await getAccountById(accountId);
    if (account?.email) {
      // Send email via the sendEmail function
      await sendEmail(title, account.email, message);
    }
  } else if (type === "push") {
    // Here we will just simulate the sending of a push notification.
    // In a real-world scenario, you could integrate a service like Firebase Cloud Messaging (FCM) here.
    console.log("Push notification sent:", title, message);
  }
}

// Fetch notifications for an account
export async function fetchNotifications(accountId: string) {
  try {
    const response = await fetch(
      `/api/notification/history?accountId=${accountId}`
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch notifications");
    }
    const data = await response.json();
    return data.notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
}

// Mark a notification as read
export async function markNotificationAsRead(notificationId: string) {
  try {
    const response = await fetch(`/api/notification/${notificationId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: true }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update notification");
    }
    const data = await response.json();
    return data.notification;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
}

// **Add the function to update notification status**:
export async function updateNotificationStatus(
  notificationId: string,
  status: "read" | "unread"
) {
  try {
    const response = await fetch(`/api/notification/${notificationId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: status === "read" }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update notification status");
    }
    const data = await response.json();
    return data.notification;
  } catch (error) {
    console.error("Error updating notification status:", error);
    throw error;
  }
}
