import { NextResponse } from "next/server";

export function handleError(error: unknown) {
  console.error("[API ERROR]:", error);
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
