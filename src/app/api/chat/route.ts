import { NextResponse } from "next/server";
import { ChatMessageSchema } from "@/lib/validation/chatSchema";
import { db } from "@/lib/db/db";
import { handleError } from "@/lib/handleError";

// Role types
type AccountRole = "BUYER" | "SELLER" | "ADMIN";
type ChatRole = "user" | "assistant"; // ✅ Now used

// GET all conversations for the account
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const accountId = searchParams.get("accountId");
    const role = searchParams.get("role")?.toUpperCase() as
      | AccountRole
      | undefined;

    if (!accountId) {
      return NextResponse.json({ error: "Missing accountId" }, { status: 400 });
    }

    const conversations = await db.chatConversation.findMany({
      where: {
        accountId,
        ...(role ? { role } : {}),
      },
      include: {
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(conversations, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

// POST: create message and conversation (if needed)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = ChatMessageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { content, role, accountRole, conversationId, accountId } =
      parsed.data;

    if (!accountId || !accountRole) {
      return NextResponse.json(
        { error: "Missing accountId and accountRole" },
        { status: 401 }
      );
    }

    const [message] = await db.$transaction(async (tx) => {
      let conversation;

      if (!conversationId) {
        // In real usage, you might want to pass the actual account role here separately
        conversation = await tx.chatConversation.create({
          data: {
            accountId,
            title: content.slice(0, 50) || "New Chat",
            role: accountRole, // 👈 Placeholder - should be passed from client if needed
          },
        });
      } else {
        conversation = await tx.chatConversation.findUnique({
          where: { id: conversationId },
        });

        if (!conversation) {
          throw new Error("Conversation not found");
        }
      }

      const message = await tx.chatMessage.create({
        data: {
          content,
          role: role as ChatRole,
          accountId,
          conversationId: conversation.id,
        },
      });

      await tx.chatConversation.update({
        where: { id: conversation.id },
        data: { updatedAt: new Date() },
      });

      return [message];
    });

    return NextResponse.json({ message }, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

// DELETE conversation
export async function DELETE(req: Request) {
  try {
    const {
      conversationId,
      accountId,
    }: { conversationId: string; accountId: string } = await req.json();

    if (!conversationId || !accountId) {
      return NextResponse.json(
        { error: "Missing conversationId or accountId" },
        { status: 400 }
      );
    }

    const conversation = await db.chatConversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation || conversation.accountId !== accountId) {
      return NextResponse.json(
        { error: "Unauthorized or not found" },
        { status: 403 }
      );
    }

    await db.chatConversation.delete({
      where: { id: conversationId },
    });

    return NextResponse.json(
      { message: "Conversation deleted" },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}
