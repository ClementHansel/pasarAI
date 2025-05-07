import { db } from "../db/db";
import { randomUUID } from "crypto";
import { hashPassword } from "./authUtils";

// Find an account by email.
export async function findAccountByEmail(email: string) {
  try {
    return await db.account.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error("Error finding account by email:", error);
    throw new Error("Failed to retrieve account");
  }
}

// Create a new session for an account.
export async function createSession({
  accountId,
  refreshToken,
  userAgent,
  ip,
}: {
  accountId: string;
  refreshToken: string;
  userAgent: string;
  ip: string;
}) {
  try {
    await db.session.create({
      data: {
        id: randomUUID(),
        accountId,
        refreshToken,
        userAgent,
        ipAddress: ip,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
      },
    });
  } catch (error) {
    console.error("Error creating session:", error);
    throw new Error("Failed to create session");
  }
}

// Update last login timestamp for the account.
export async function updateLastLogin(accountId: string) {
  try {
    await db.account.update({
      where: { id: accountId },
      data: {
        lastLoginAt: new Date(),
      },
    });
  } catch (error) {
    console.error("Error updating last login:", error);
    throw new Error("Failed to update last login");
  }
}

// Register a new user account.
export async function registerUser({
  email,
  password,
  name,
  role = "BUYER",
}: {
  email: string;
  password: string;
  name: string;
  role?: "BUYER" | "SELLER" | "ADMIN";
}) {
  try {
    const hashedPassword = await hashPassword(password);

    return await db.account.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
        isVerified: false,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("Failed to register account");
  }
}

// Invalidate all sessions for an account (e.g. after password change).

export async function invalidateSessions(accountId: string) {
  try {
    await db.session.deleteMany({
      where: { accountId },
    });
  } catch (error) {
    console.error("Error invalidating sessions:", error);
    throw new Error("Failed to invalidate sessions");
  }
}

// Increment the tokenVersion for an account to invalidate old refresh tokens.

export async function incrementTokenVersion(accountId: string) {
  try {
    await db.account.update({
      where: { id: accountId },
      data: {
        tokenVersion: { increment: 1 },
      },
    });
  } catch (error) {
    console.error("Error incrementing token version:", error);
    throw new Error("Failed to increment token version");
  }
}
