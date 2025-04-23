// src/app/api/payment/verify/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { paymentId, verificationToken } = await req.json();

  if (!paymentId || !verificationToken) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  // Mock verification logic
  const verified = verificationToken === "demo-token";

  return NextResponse.json({
    message: verified ? "Payment verified" : "Verification failed",
    verified,
  });
}
