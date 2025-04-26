import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { getAccountById } from "../account/accountService";

// Create a transporter for Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    account: process.env.EMAIL_ACCOUNT,
    pass: process.env.EMAIL_PASS,
  },
} as SMTPTransport.Options);

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

// Function to simulate sending push, or email notifications
export async function sendNotification(
  type: "email" | "push",
  accountId: string,
  title: string,
  message: string
) {
  if (type === "email") {
    // Send email notification using Nodemailer
    const account = await getAccountById(accountId);
    if (account?.email) {
      await sendEmail(title, account.email, message);
    }
  } else if (type === "push") {
    // Handle push notification (you can integrate a push notification service here)
    console.log("Push notification sent:", title, message);
  }
}
