import { NextRequest, NextResponse } from "next/server";
import { verifyMagicLinkToken } from "@/lib/auth/authUtils";
import { db } from "@/lib/db/db";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  try {
    const { email } = verifyMagicLinkToken(token);
    const account = await db.account.findUnique({ where: { email } });
    if (!account) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }
    if (account.isVerified) {
      return NextResponse.json({ message: "Account already verified" });
    }
    await db.account.update({
      where: { email },
      data: { isVerified: true, emailVerifiedAt: new Date() },
    });
    return NextResponse.json({ message: "Email verified successfully" });
  } catch {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 400 }
    );
  }
}
