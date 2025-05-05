import { callAI } from "@/lib/chat/aiClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const result = await callAI(prompt);
    return NextResponse.json({ result });
  } catch (err) {
    console.error("AI Call Failed:", err);
    return NextResponse.json({ error: "AI call failed" }, { status: 500 });
  }
}
