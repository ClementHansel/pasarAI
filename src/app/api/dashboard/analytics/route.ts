import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

import { emitAnalyticsEvent } from "@/lib/utils/analytics";
import { getServerSession } from "next-auth";

import { analyticsEventSchema } from "@/lib/validation/analyticsSchema";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const body = await req.json();
  const result = analyticsEventSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid analytics event", details: result.error.errors },
      { status: 400 }
    );
  }

  try {
    const event = result.data;
    await emitAnalyticsEvent({
      ...event,
      accountId: event.accountId ?? userId ?? "anonymous",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to emit analytics event", err);
    return NextResponse.json(
      { error: "Failed to emit analytics event" },
      { status: 500 }
    );
  }
}
