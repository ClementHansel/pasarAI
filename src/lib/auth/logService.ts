import { db } from "../db/db";
import { randomUUID } from "crypto";

interface LogLoginAttempt {
  email: string;
  success: boolean;
  ipAddress?: string;
  userAgent?: string;
}

interface LogSessionActivity {
  accountId: string;
  activity: string;
  ipAddress?: string;
  userAgent?: string;
}

interface LogAccountAction {
  accountId: string;
  action: string;
  timestamp: Date;
}

// Function to log login attempts (successful or failed)
export async function logLoginAttempt({
  email,
  success,
  ipAddress,
  userAgent,
}: LogLoginAttempt) {
  try {
    await db.loginAttempt.create({
      data: {
        id: randomUUID(),
        email,
        success,
        ipAddress,
        userAgent,
        timestamp: new Date(),
      },
    });
  } catch (error) {
    console.error("Error logging login attempt:", error);
    throw new Error("Failed to log login attempt");
  }
}

// Function to log session activity (for tracking user actions during a session)
export async function logSessionActivity({
  accountId,
  activity,
  ipAddress,
  userAgent,
}: LogSessionActivity) {
  try {
    await db.sessionActivity.create({
      data: {
        id: randomUUID(),
        accountId,
        activity,
        ipAddress,
        userAgent,
        timestamp: new Date(),
      },
    });
  } catch (error) {
    console.error("Error logging session activity:", error);
    throw new Error("Failed to log session activity");
  }
}

// Function to log account actions (e.g., password change, profile update)
export async function logAccountAction({
  accountId,
  action,
  timestamp,
}: LogAccountAction) {
  try {
    await db.accountAction.create({
      data: {
        id: randomUUID(),
        accountId,
        action,
        timestamp,
      },
    });
  } catch (error) {
    console.error("Error logging account action:", error);
    throw new Error("Failed to log account action");
  }
}

// Optionally, you can have a function to log error events or system failures
export async function logError(error: Error, context: string) {
  try {
    await db.errorLog.create({
      data: {
        id: randomUUID(),
        message: error.message,
        stack: error.stack,
        context,
        timestamp: new Date(),
      },
    });
  } catch (err) {
    console.error("Error logging error:", err);
    throw new Error("Failed to log error");
  }
}
