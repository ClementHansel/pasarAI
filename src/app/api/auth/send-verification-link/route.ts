// src/app/api/auth/send-verification-link/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { generateMagicLinkToken } from "@/lib/auth/authUtils";
import { sendEmail } from "@/lib/mailer.server";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (typeof email !== "string") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const account = await db.account.findUnique({ where: { email } });
  if (!account) {
    return NextResponse.json({ error: "Account not found" }, { status: 404 });
  }

  // If already verified, bail early
  if (account.isVerified) {
    return NextResponse.json(
      { error: "Account already verified" },
      { status: 400 }
    );
  }

  const token = generateMagicLinkToken(email);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!baseUrl) {
    console.error("NEXT_PUBLIC_SITE_URL not set");
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 }
    );
  }

  const verificationUrl = `${baseUrl}/verify-account?token=${encodeURIComponent(
    token
  )}`;

  // you can send both text and HTML bodies:
  await sendEmail(
    email,
    "Verify Your Account",
    `Click this link to verify: ${verificationUrl}`,
    `<p>Click <a href="${verificationUrl}">here</a> to verify your account.</p>`
  );

  return NextResponse.json({ success: true });
}
