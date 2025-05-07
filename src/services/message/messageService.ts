import { db } from "@/lib/db/db";

export const getConversations = async (
  accountId: string,
  search: string = ""
) => {
  return db.conversation.findMany({
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
};

export const sendMessage = async (
  senderId: string,
  receiverId: string,
  content: string
) => {
  return await db.$transaction(async (tx) => {
    let conversation = await tx.conversation.findFirst({
      where: {
        participants: {
          every: {
            id: {
              in: [senderId, receiverId],
            },
          },
        },
      },
    });

    if (!conversation) {
      conversation = await tx.conversation.create({
        data: {
          participants: {
            connect: [{ id: senderId }, { id: receiverId }],
          },
        },
      });
    }

    const message = await tx.message.create({
      data: {
        content,
        senderId,
        accountId: receiverId,
        conversationId: conversation.id,
      },
    });

    return message;
  });
};

export const markMessagesAsRead = async (
  accountId: string,
  conversationId: string
) => {
  return db.message.updateMany({
    where: {
      accountId,
      conversationId,
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });
};

export const getThreadMessages = async (
  conversationId: string,
  take: number,
  skip: number,
  search: string = ""
) => {
  const [messages, total] = await db.$transaction([
    db.message.findMany({
      where: {
        conversationId,
        content: search ? { contains: search, mode: "insensitive" } : undefined,
      },
      orderBy: { createdAt: "desc" },
      take,
      skip,
    }),
    db.message.count({
      where: {
        conversationId,
        content: search ? { contains: search, mode: "insensitive" } : undefined,
      },
    }),
  ]);

  return {
    messages,
    hasMore: skip + take < total,
  };
};
