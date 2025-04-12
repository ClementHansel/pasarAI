// src/app/api/auth/login/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
} from "@/lib/auth/authUtils";
import jwt, { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
        tokenVersion: true,
        isVerified: true,
      },
    });

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

    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
      tokenVersion: user.tokenVersion, // Now we have tokenVersion
    });

    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
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
