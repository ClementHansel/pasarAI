import { db } from "@/lib/db/db";
import {
  GetMessagesSchema,
  MarkAsReadSchema,
  SendMessageSchema,
} from "@/lib/validation/messageSchemas";
import {
  getConversations,
  markMessagesAsRead,
  sendMessage,
} from "@/services/message/messageService";
import { NextRequest, NextResponse } from "next/server";

// GET /api/messages
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const params = {
      accountId: searchParams.get("accountId"),
      search: searchParams.get("search") || undefined,
    };

    const parsed = GetMessagesSchema.safeParse(params);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { accountId, search } = parsed.data;
    const conversations = await getConversations(accountId, search || "");
    return NextResponse.json(conversations);
  } catch (error) {
    console.error("GET /api/messages error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/messages
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = SendMessageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { senderId, receiverId, content } = parsed.data;
    const message = await sendMessage(senderId, receiverId, content);
    return NextResponse.json({ message });
  } catch (error) {
    console.error("POST /api/messages error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH /api/messages
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = MarkAsReadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { accountId, conversationId } = parsed.data;
    await markMessagesAsRead(accountId, conversationId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PATCH /api/messages error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/messages
export async function DELETE(req: NextRequest) {
  try {
    // Retrieve the list of IDs from the request body
    const { ids }: { ids: number[] } = await req.json();

    // Validate the IDs
    if (!Array.isArray(ids) || ids.some((id) => typeof id !== "number")) {
      return NextResponse.json(
        { error: "Invalid request: ids should be an array of numbers" },
        { status: 400 }
      );
    }

    // Convert the number array to a string array
    const stringIds = ids.map((id) => id.toString());

    // Example using Prisma to delete multiple records
    const deletedConversations = await db.conversation.deleteMany({
      where: {
        id: {
          in: stringIds, // Pass the string array
        },
      },
    });

    // Check if any conversation was deleted
    if (deletedConversations.count === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No conversations found with the provided IDs",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      deletedCount: deletedConversations.count,
    });
  } catch (error) {
    console.error("Error deleting conversations:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while deleting conversations",
      },
      { status: 500 }
    );
  }
}
