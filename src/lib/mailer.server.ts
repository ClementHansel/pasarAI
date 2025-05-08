// src/lib/mailer.server.ts
import nodemailer, { Transporter } from "nodemailer";

// Load and validate required environment variables
const {
  EMAIL_USER,
  EMAIL_PASS,
  SMTP_HOST = "smtp.gmail.com",
  SMTP_PORT = "587",
} = process.env;

if (!EMAIL_USER || !EMAIL_PASS) {
  throw new Error(
    "Missing required EMAIL_USER or EMAIL_PASS environment variables."
  );
}

let transporter: Transporter;
try {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_PORT === "465", // true for port 465, false for other ports (e.g. 587)
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS, // your App Password if using Gmail + 2FA
    },
  });
  console.log(
    `✉️  Mailer configured: host=${SMTP_HOST} port=${SMTP_PORT} secure=${
      SMTP_PORT === "465"
    }`
  );
} catch (error) {
  console.error("Failed to create Nodemailer transporter:", error);
  throw error;
}

/**
 * Sends an email using the configured transporter.
 * @param subject - Email subject line
 * @param to - Recipient email address
 * @param text - Plain-text body
 * @param html - Optional HTML body
 */
export async function sendEmail(
  subject: string,
  to: string,
  text: string,
  html?: string
): Promise<void> {
  const mailOptions: nodemailer.SendMailOptions = {
    from: EMAIL_USER,
    to,
    subject,
    text,
    ...(html ? { html } : {}),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent: ${info.messageId}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email sending failed");
  }
}
