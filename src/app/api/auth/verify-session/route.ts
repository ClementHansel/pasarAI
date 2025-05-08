// src/app/api/auth/verify-session/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db/db";

export async function GET() {
  try {
    // Get session from NextAuth
    const session = await getServerSession(authOptions);

    // Basic session validation
    if (!session?.user?.email) {
      return NextResponse.json(
        { valid: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get account with latest session
    const account = await db.account.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        email: true,
        role: true,
        isVerified: true,
        sessions: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    // Account or session validation failed
    if (!account || !account.sessions.length) {
      return NextResponse.json(
        { valid: false, error: "Session expired" },
        { status: 401 }
      );
    }

    // Check if latest session is expired
    const latestSession = account.sessions[0];
    if (new Date(latestSession.expires) < new Date()) {
      return NextResponse.json(
        { valid: false, error: "Session expired" },
        { status: 401 }
      );
    }

    // Return verified session data
    return NextResponse.json({
      valid: true,
      account: {
        id: account.id,
        email: account.email,
        role: account.role,
        isVerified: account.isVerified,
      },
    });
  } catch (error) {
    console.error("Session verification error:", error);
    return NextResponse.json(
      { valid: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
