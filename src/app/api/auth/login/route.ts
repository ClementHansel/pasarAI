// src/app/api/auth/login/route.ts

import { NextResponse } from "next/server";
import { PrismaClient, Role } from "@prisma/client"; // Use Prisma Role enum directly
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken, // Import the centralized verifyRefreshToken function
} from "@/lib/auth/authUtils";

// Initialize Prisma client
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Parse incoming JSON data
    const { email, password, refreshToken } = await req.json(); // Assuming refreshToken is passed in the request body

    // If refreshToken is provided, verify it first
    if (refreshToken) {
      try {
        const { sub, version } = verifyRefreshToken(refreshToken); // Verify refresh token
        console.log("Refresh token verified", { sub, version });

        // Optionally, handle any logic if refreshToken is valid.
        // For example, you can check if the user associated with `sub` exists and is active.
      } catch {
        return NextResponse.json(
          { error: "Invalid refresh token" },
          { status: 401 }
        );
      }
    }

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
        isVerified: true,
      },
    });

    // Check if the user exists and password is correct
    if (!user || !(await comparePassword(password, user.password))) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check if the user is verified
    if (!user.isVerified) {
      return NextResponse.json(
        { error: "Account not verified" },
        { status: 403 }
      );
    }

    // Use Prisma Role enum type directly
    const userRole: Role = user.role;

    // Generate tokens
    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: userRole,
    });

    const newRefreshToken = generateRefreshToken({
      id: user.id,
      tokenVersion: user.tokenVersion,
    });

    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: userRole,
      },
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    console.error("Login Error:", err); // Logging the error for internal use
    // Send a generic error message to the client for security reasons
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
