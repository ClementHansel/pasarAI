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

    console.log(
      "Fetching conversations for accountId:",
      accountId,
      "and role:",
      role
    );

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

    console.log("Conversations:", conversations);

    return NextResponse.json(conversations, { status: 200 });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return handleError(error);
  }
}

// POST: create message and conversation (if needed)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = ChatMessageSchema.safeParse(body);

    if (!parsed.success) {
      console.error("Validation failed:", parsed.error.flatten());
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
        // Create new conversation if none exists
        conversation = await tx.chatConversation.create({
          data: {
            accountId,
            title: content.slice(0, 50) || "New Chat",
            role: accountRole, // Account role passed from client
          },
        });

        // Return the new conversationId
        console.log("Created new conversation:", conversation.id);
      } else {
        // Retrieve existing conversation
        conversation = await tx.chatConversation.findUnique({
          where: { id: conversationId },
        });

        if (!conversation) {
          throw new Error("Conversation not found");
        }
      }

      // Save user message to the database
      const userMessage = await tx.chatMessage.create({
        data: {
          content,
          role: role as ChatRole,
          accountId,
          conversationId: conversation.id,
        },
      });

      // Update conversation timestamp
      await tx.chatConversation.update({
        where: { id: conversation.id },
        data: { updatedAt: new Date() },
      });

      // Step 2: AI Response - send the user's message to AI for a response
      const aiResponse = await fetchAIResponse(content); // Call the AI response logic
      console.log("AI Response:", aiResponse);

      if (aiResponse) {
        // Save AI message to the database
        const assistantMessage = await tx.chatMessage.create({
          data: {
            content: aiResponse,
            role: "assistant",
            accountId,
            conversationId: conversation.id,
          },
        });

        return [userMessage, assistantMessage];
      } else {
        return [userMessage]; // Return just user message if no AI response
      }
    });

    // Return the conversationId with the saved message
    return NextResponse.json(
      { message, conversationId: message.conversationId }, // Send the conversationId in the response
      { status: 201 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return handleError(error);
  }
}

// Helper function to fetch AI response (ensure it's correct)
async function fetchAIResponse(content: string): Promise<string | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ai`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: content }),
    });

    const data = await res.json();

    if (!res.ok || !data.result) {
      console.error("AI response failed", data.error);
      return null;
    }

    return data.result;
  } catch (err) {
    console.error("AI fetch error", err);
    return null;
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
