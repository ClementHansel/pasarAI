// src/app/api/log/route.ts

import { NextRequest, NextResponse } from "next/server";

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogPayload {
  level: LogLevel;
  message: string;
  data?: Record<string, unknown>;
  timestamp: string;
  tag?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as LogPayload;

    const { level, message, data, timestamp, tag = "AppLog" } = body;

    const logLine = `[${timestamp}] [${tag}] [${level.toUpperCase()}] ${message}`;

    // Log to server console
    switch (level) {
      case "info":
        console.info(logLine, data ?? "");
        break;
      case "warn":
        console.warn(logLine, data ?? "");
        break;
      case "error":
        console.error(logLine, data ?? "");
        break;
      case "debug":
        console.debug(logLine, data ?? "");
        break;
    }

    // Optional: Save to DB or file system here if needed
    // await saveToDatabase({ level, message, data, timestamp, tag });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/log] Failed to process log:", err);
    return NextResponse.json(
      { success: false, error: "Failed to log" },
      { status: 500 }
    );
  }
}
