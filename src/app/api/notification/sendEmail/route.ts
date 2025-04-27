import { sendEmail } from "@/services/notification/notificationService";
import { NextApiRequest, NextApiResponse } from "next";

// API route to send email notifications
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { subject, recipient, text } = req.body;

    try {
      // Call sendEmail function to send the email
      await sendEmail(subject, recipient, text);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Email sending failed" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
