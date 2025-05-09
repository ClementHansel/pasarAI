// src/app/api/auth/verify-session/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";

export async function GET() {
  try {
    // Get session from NextAuth
    const session = await getServerSession(authOptions);

    // Basic session validation
    if (!session?.user?.email || !session.user.id) {
      return NextResponse.json(
        { valid: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      valid: true,
      account: {
        id: session.user.id,
        email: session.user.email,
        role: session.user.role,
        isVerified: session.user.isVerified,
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
