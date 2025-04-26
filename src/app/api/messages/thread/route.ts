import { NextRequest, NextResponse } from "next/server";

import { ThreadMessagesSchema } from "@/lib/validation/messageSchemas";
import { getThreadMessages } from "@/services/message/messageService";

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
