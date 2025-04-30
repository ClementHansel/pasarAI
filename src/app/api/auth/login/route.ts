import { NextResponse } from "next/server";

import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
} from "@/lib/auth/authUtils";
import { loginSchema } from "@/lib/validation/authValidation";
import { rateLimiter } from "@/lib/rateLimiter";
import {
  createSession,
  findAccountByEmail,
  updateLastLogin,
} from "@/lib/auth/accountService";
import { logLoginAttempt } from "@/services/account/accountService";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const userAgent = req.headers.get("user-agent") || "unknown";

  try {
    // Check rate limit
    const { remaining } = await rateLimiter(ip);

    if (remaining <= 0) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
        { status: 429 }
      );
    }

    // Parse and validate input
    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    // Find user
    const account = await findAccountByEmail(email);

    // Ensure account and account.email are valid
    if (
      !account ||
      typeof account.email !== "string" ||
      typeof account.password !== "string" || // ✅ add this check
      !(await comparePassword(password, account.password))
    ) {
      // Explicitly cast email to string if it's null
      await logLoginAttempt({
        email: String(account?.email ?? "unknown"),
        success: false,
        ipAddress: ip,
        userAgent,
      });

      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    if (!account.isVerified) {
      await logLoginAttempt({
        email: (account?.email ?? "unknown") as string, // Ensure it's treated as a string
        success: false,
        ipAddress: ip,
        userAgent,
      });

      return NextResponse.json(
        { error: "Please verify your account first." },
        { status: 403 }
      );
    }

    // Generate tokens
    const accessToken = generateAccessToken({
      id: account.id,
      email: account.email,
      role: account.role,
    });

    const newRefreshToken = generateRefreshToken({
      id: account.id,
      tokenVersion: account.tokenVersion,
    });

    // Create new session
    await createSession({
      accountId: account.id,
      refreshToken: newRefreshToken,
      userAgent,
      ip,
    });

    await updateLastLogin(account.id);

    await logLoginAttempt({
      email: account.email, // account.email is guaranteed to be a string here
      success: true,
      ipAddress: ip,
      userAgent,
    });

    return NextResponse.json(
      {
        message: "Login successful.",
        account: {
          id: account.id,
          name: account.name,
          email: account.email,
          role: account.role,
        },
        tokens: {
          accessToken,
          refreshToken: newRefreshToken,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { error: "Invalid request or internal server error." },
      { status: 400 }
    );
  }
}
