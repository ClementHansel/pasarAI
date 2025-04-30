import { NextRequest, NextResponse } from "next/server";

import { ThreadMessagesSchema } from "@/lib/validation/messageSchemas";
import { getThreadMessages } from "@/services/message/messageService";
import { db } from "@/lib/db/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const rawParams = {
      conversationId: searchParams.get("conversationId"),
      take: searchParams.get("take"),
      skip: searchParams.get("skip"),
      search: searchParams.get("search") || undefined,
    };

    const parsed = ThreadMessagesSchema.safeParse(rawParams);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { conversationId, take, skip, search } = parsed.data;

    const result = await getThreadMessages(conversationId, take, skip, search);
    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/messages/thread error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/messages/[id]
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id; // keep as string

  if (!id || typeof id !== "string") {
    return NextResponse.json(
      { success: false, message: "Invalid ID" },
      { status: 400 }
    );
  }

  try {
    const deleted = await db.message.delete({
      where: { id }, // use string directly
    });

    return NextResponse.json({ success: true, deleted });
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete message" },
      { status: 500 }
    );
  }
}
