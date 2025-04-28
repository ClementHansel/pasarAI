// src/app/api/notification/sendEmail/route.ts

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/services/notification/notificationService";

// 1) Define a Zod schema for the POST body
const sendEmailSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  recipient: z.string().email("Must be a valid email"),
  text: z.string().min(1, "Text is required"),
});

// 2) Handle POST /api/notification/sendEmail
export async function POST(req: NextRequest) {
  // Parse & validate JSON
  let body: unknown;
  try {
    body = await req.json();
  } catch (err) {
    console.error("sendEmail: invalid JSON", err);
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  const result = sendEmailSchema.safeParse(body);
  if (!result.success) {
    // Return all validation errors
    return NextResponse.json(
      { errors: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  const { subject, recipient, text } = result.data;

  // Attempt to send
  try {
    await sendEmail(subject, recipient, text);
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("sendEmail error:", err);
    return NextResponse.json(
      { error: "Email sending failed" },
      { status: 500 }
    );
  }
}

// 3) For any other HTTP method, return 405
export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
