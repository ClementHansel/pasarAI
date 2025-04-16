// src/app/api/auth/login/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
} from "@/lib/auth/authUtils";
import jwt, { JwtPayload } from "jsonwebtoken";

// Initialize Prisma client
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Parse incoming JSON data
    const { email, password } = await req.json();

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    // Retrieve the user from the database
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
        tokenVersion: true,
        isVerified: true, // Check if the user is verified
      },
    });

    // Check if the user exists and if the password matches
    if (!user || !(await comparePassword(password, user.password))) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Optional: Check if the user is verified
    if (!user.isVerified) {
      return NextResponse.json(
        { error: "Account not verified" },
        { status: 403 }
      );
    }

    // Generate JWT tokens
    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
      tokenVersion: user.tokenVersion, // Include token version
    });

    // Return the response with user data and tokens
    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role, // Include role in response
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// --- Verify Refresh Token Utility ---
export function verifyRefreshToken(token: string): {
  sub: string;
  version: number;
} {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET || "dev_refresh_secret"
    );

    if (typeof decoded !== "object" || decoded === null) {
      throw new Error("Invalid refresh token");
    }

    const { sub, version } = decoded as JwtPayload;

    if (typeof sub !== "string" || typeof version !== "number") {
      throw new Error("Malformed refresh token");
    }

    return { sub, version };
  } catch (error) {
    console.error("Refresh Token Error:", error);
    throw new Error("Invalid refresh token");
  }
}
