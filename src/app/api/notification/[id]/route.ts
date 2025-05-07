import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/db"; // Prisma client instance
import { z } from "zod";
import { updateNotificationSchema } from "@/lib/validation/notificationSchema";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: "Missing notification ID" },
      { status: 400 }
    );
  }

  // Convert string ID to number
  const notificationId = Number(id);
  if (isNaN(notificationId)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  let parsedBody: z.infer<typeof updateNotificationSchema>;

  try {
    const body = await req.json();
    parsedBody = updateNotificationSchema.parse(body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    console.error("Invalid request body:", error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  if (Object.keys(parsedBody).length === 0) {
    return NextResponse.json(
      { error: "No valid fields to update" },
      { status: 400 }
    );
  }

  try {
    const existingNotification = await db.notification.findUnique({
      where: { id: notificationId },
    });

    if (!existingNotification) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      );
    }

    const updatedNotification = await db.notification.update({
      where: { id: notificationId },
      data: parsedBody,
    });

    return NextResponse.json(
      { notification: updatedNotification },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update notification:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
