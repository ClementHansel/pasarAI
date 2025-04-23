// src/app/api/payment/status/route.ts

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const paymentId = url.searchParams.get("paymentId");

  if (!paymentId) {
    return NextResponse.json({ error: "Payment ID required" }, { status: 400 });
  }

  // Mock status
  const status = "completed";

  return NextResponse.json({
    paymentId,
    status,
  });
}
