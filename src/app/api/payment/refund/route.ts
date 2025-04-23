// src/app/api/payment/refund/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { paymentId, reason } = await req.json();

  if (!paymentId) {
    return NextResponse.json({ error: "Payment ID required" }, { status: 400 });
  }

  // Mock refund logic
  return NextResponse.json({
    message: "Refund initiated",
    paymentId,
    refunded: true,
    reason,
  });
}
