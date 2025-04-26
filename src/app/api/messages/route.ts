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
