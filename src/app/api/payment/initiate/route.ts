// src/app/api/payment/initiate/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // Example: Validate input
  if (!body.amount || !body.method) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Mock payment logic
  const paymentId = Math.random().toString(36).substring(2);

  return NextResponse.json({
    message: "Payment initiated",
    paymentId,
    amount: body.amount,
    method: body.method,
  });
}
