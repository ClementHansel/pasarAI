import { NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/middleware";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "No token provided" },
        { status: 401 }
      );
    }

    const user = verifyAccessToken(token);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 401 }
    );
  }
}