import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Conversations with optional filters
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const accountId = searchParams.get("accountId");
    const search = searchParams.get("search") || "";

    if (!accountId) {
      return NextResponse.json({ error: "Missing accountId" }, { status: 400 });
    }

    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: { id: accountId },
        },
        OR: search
          ? [
              {
                participants: {
                  some: {
                    name: { contains: search, mode: "insensitive" },
                  },
                },
              },
              {
                messages: {
                  some: {
                    content: { contains: search, mode: "insensitive" },
                  },
                },
              },
            ]
          : undefined,
      },
      include: {
        participants: true,
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(conversations);
  } catch (error) {
    console.error("GET /api/messages error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST: Send a new message
export async function POST(req: Request) {
  try {
    const { senderId, receiverId, content } = await req.json();

    if (!senderId || !receiverId || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let conversation = await prisma.conversation.findFirst({
      where: {
        participants: {
          every: { id: { in: [senderId, receiverId] } },
        },
      },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participants: {
            connect: [{ id: senderId }, { id: receiverId }],
          },
        },
      });
    }

    const message = await prisma.message.create({
      data: {
        content,
        senderId,
        accountId: receiverId,
        conversationId: conversation.id,
      },
    });

    return NextResponse.json({ message });
  } catch (error) {
    console.error("POST /api/messages error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH: Mark messages as read
export async function PATCH(req: Request) {
  try {
    const { accountId, conversationId } = await req.json();

    if (!accountId || !conversationId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await prisma.message.updateMany({
      where: {
        accountId,
        conversationId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PATCH /api/messages error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// /api/messages/thread?conversationId=xxx&take=20&skip=0&search=hello
export async function GET_THREAD(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get("conversationId");
    const take = parseInt(searchParams.get("take") || "20");
    const skip = parseInt(searchParams.get("skip") || "0");
    const search = searchParams.get("search") || "";

    if (!conversationId) {
      return NextResponse.json(
        { error: "Missing conversationId" },
        { status: 400 }
      );
    }

    const messages = await prisma.message.findMany({
      where: {
        conversationId,
        content: search
          ? {
              contains: search,
              mode: "insensitive",
            }
          : undefined,
      },
      orderBy: {
        createdAt: "desc",
      },
      take,
      skip,
    });

    const total = await prisma.message.count({
      where: {
        conversationId,
        content: search
          ? {
              contains: search,
              mode: "insensitive",
            }
          : undefined,
      },
    });

    const hasMore = skip + take < total;

    return NextResponse.json({ messages, hasMore });
  } catch (error) {
    console.error("GET_THREAD error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
