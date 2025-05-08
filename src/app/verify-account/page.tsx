// src/app/verify-account/page.tsx
import { redirect } from "next/navigation";
import { verifyMagicLinkToken } from "@/lib/auth/authUtils";
import { db } from "@/lib/db/db";

export default async function VerifyAccount({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token;
  if (!token) {
    // no token at all → back to login
    return redirect("/login?error=missing_token");
  }

  try {
    const { email } = verifyMagicLinkToken(token);
    await db.account.update({
      where: { email },
      data: { isVerified: true },
    });
    // success → inform login
    return redirect("/login?verified=true");
  } catch (err) {
    console.error("Token verification failed:", err);
    // invalid or expired → redirect with error
    return redirect("/login?error=invalid_or_expired_token");
  }
}
