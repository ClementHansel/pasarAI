import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db/db"; // Prisma DB instance
import { sendNotification } from "@/services/notification/notificationService";

// Schema validation for the incoming request body
const notificationSchema = z.object({
  accountId: z.string().min(1), // The account to send the notification to
  type: z.enum(["email", "push"]), // Type of notification
  message: z.string().min(1), // The notification message
  title: z.string().min(1), // Title for the notification
  status: z.enum(["pending", "sent", "failed"]).default("pending"), // Status of notification
});

export async function POST(req: NextRequest) {
  let body: unknown;

  // Parse the incoming request body
  try {
    body = await req.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error parsing JSON:", error.message);
    }
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Validate the incoming data with Zod
  let validatedBody;
  try {
    validatedBody = notificationSchema.parse(body);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Unexpected validation error" },
      { status: 500 }
    );
  }

  const { accountId, type, message, title, status } = validatedBody;

  // Start a database transaction to ensure ACID properties
  try {
    // Using Prisma to ensure atomicity
    const result = await db.$transaction(async (tx) => {
      // Step 1: Create a notification record in the database
      const newNotification = await tx.notification.create({
        data: {
          accountId,
          type,
          message,
          title,
          status, // Status will be "pending" initially
          reason: "Created via API",
        },
      });

      // Step 2: Send the notification through the appropriate service
      let sendStatus = "failed";
      try {
        await sendNotification(type, accountId, title, message);
        sendStatus = "sent"; // If the notification is sent successfully, mark it as sent
      } catch (notificationError) {
        console.error("Notification sending failed:", notificationError);
      }

      // Step 3: Update the notification status in the database
      await tx.notification.update({
        where: { id: newNotification.id },
        data: { status: sendStatus }, // Set the final status
      });

      return newNotification; // Returning the created notification
    });

    // Return the result as a successful response
    return NextResponse.json(
      { message: "Notification processed", notification: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Transaction error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
