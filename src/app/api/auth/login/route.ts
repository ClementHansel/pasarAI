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

// NOTE: This custom login route is now unused since NextAuth handles credentials login.
// It is kept here for reference and possible future use, but should not be used in production.
// All login logic should go through NextAuth's /api/auth/[...nextauth] endpoint.

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

    // Basic validation
    if (
      !account ||
      !account.email ||
      !account.password ||
      !(await comparePassword(password, account.password))
    ) {
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

    // Check account verification
    if (!account.isVerified) {
      await logLoginAttempt({
        email: account.email,
        success: false,
        ipAddress: ip,
        userAgent,
      });
      return NextResponse.json(
        { error: "Please verify your account first." },
        { status: 403 }
      );
    }

    // Role-specific validation
    if (account.role === "SELLER") {
      // Additional checks for sellers could go here
      // For example, checking if they have completed their seller profile
      // or if they have been approved as a seller
      if (!account.isVerified) {
        return NextResponse.json(
          { error: "Your seller account is pending verification." },
          { status: 403 }
        );
      }
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
      email: account.email,
      success: true,
      ipAddress: ip,
      userAgent,
    });

    // Return role-specific response
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
        // All users go to homepage, sellers will have dashboard access via nav
        redirectTo: "/",
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
