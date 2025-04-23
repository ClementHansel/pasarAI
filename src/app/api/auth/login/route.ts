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
        // For example, you can check if the account associated with `sub` exists and is active.
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

    // Retrieve the account from the database
    const account = await prisma.account.findUnique({
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

    // Check if the account exists and password is correct
    if (!account || !(await comparePassword(password, account.password))) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check if the account is verified
    if (!account.isVerified) {
      return NextResponse.json(
        { error: "Account not verified" },
        { status: 403 }
      );
    }

    // Use Prisma Role enum type directly
    const accountRole: Role = account.role;

    // Generate tokens
    const accessToken = generateAccessToken({
      id: account.id,
      email: account.email,
      role: accountRole,
    });

    const newRefreshToken = generateRefreshToken({
      id: account.id,
      tokenVersion: account.tokenVersion,
    });

    return NextResponse.json({
      message: "Login successful",
      account: {
        id: account.id,
        name: account.name,
        email: account.email,
        role: accountRole,
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
