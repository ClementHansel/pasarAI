import { NextRequest, NextResponse } from "next/server";
import { analyticsBatchSchema } from "@/lib/validation/analyticsSchema";
import { db } from "@/lib/db/db";

// POST handler for analytics batching
export async function POST(req: NextRequest) {
  try {
    const json = await req.json();

    const parsed = analyticsBatchSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid analytics event data",
          issues: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    const { events } = parsed.data;

    // Start transaction (assumes Prisma-style API)
    await db.$transaction(
      events.map((event) =>
        db.analyticsEvent.create({
          data: {
            eventName: event.eventName,
            accountId: event.accountId,
            metadata: event.metadata ?? {},
            timestamp: event.timestamp ?? new Date().toISOString(),
          },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Analytics ingestion failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
