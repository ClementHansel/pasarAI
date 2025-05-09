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
  if (account.isVerified) {
    return NextResponse.json(
      { error: "Account already verified" },
      { status: 400 }
    );
  }

  const token = generateMagicLinkToken(email);
  const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!rawBaseUrl) {
    console.error("NEXT_PUBLIC_SITE_URL not set");
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 }
    );
  }
  const baseUrl = rawBaseUrl.replace(/\/$/, "");
  // ▶️ NEW API ROUTE PATH:
  const verificationUrl = `${baseUrl}/api/auth/verify-account?token=${encodeURIComponent(
    token
  )}`;

  await sendEmail(
    "Verify Your Account",
    email,
    `Click this link to verify: ${verificationUrl}`,
    `<p>Click <a href="${verificationUrl}">here</a> to verify your account.</p>`
  );

  return NextResponse.json({ success: true });
}
