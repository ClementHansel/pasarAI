// src/app/api/messages/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { accountId } = await req.json(); // Assume the user ID is sent with the request

    // Fetch unread messages for the user
    const messages = await prisma.message.findMany({
      where: { accountId },
      orderBy: { createdAt: "desc" }, // Sort messages by creation date
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
