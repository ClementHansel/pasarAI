import nodemailer, { Transporter } from "nodemailer";

// Load and validate required environment variables
const { EMAIL_ACCOUNT, EMAIL_PASS, EMAIL_SERVICE = "gmail" } = process.env;

if (!EMAIL_ACCOUNT || !EMAIL_PASS) {
  throw new Error(
    "Missing required EMAIL_ACCOUNT or EMAIL_PASS environment variables."
  );
}

// Initialize Nodemailer transporter (server-side only)
let transporter: Transporter;
try {
  transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
      user: EMAIL_ACCOUNT,
      pass: EMAIL_PASS,
    },
  });
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
    from: EMAIL_ACCOUNT,
    to,
    subject,
    text,
    ...(html ? { html } : {}),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email sending failed");
  }
}
