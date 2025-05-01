import { Role, Session, LoginAttempt, Prisma } from "@prisma/client";
import { db } from "../../lib/db/db";

// Custom Error Classes
export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class PermissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PermissionError";
  }
}

export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DatabaseError";
  }
}

// Account Service

type PaginationParams = { page?: number; limit?: number };

// Fetch paginated accounts
export const getAccounts = async ({
  page = 1,
  limit = 10,
}: PaginationParams) => {
  try {
    const skip = (page - 1) * limit;

    const [accounts, total] = await db.$transaction([
      db.account.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          lastLoginAt: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      db.account.count(),
    ]);

    return {
      data: accounts,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("[AccountService] Failed to fetch accounts:", error);
    throw new DatabaseError("Failed to fetch accounts.");
  }
};

// Fetch single account by ID
export const getAccountById = async (id: string) => {
  try {
    return await db.account.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
      },
    });
  } catch (error) {
    console.error(`[AccountService] Failed to fetch account (${id}):`, error);
    throw new DatabaseError("Failed to fetch account by ID.");
  }
};

// Fetch account by email
export const getAccountByEmail = async (email: string) => {
  try {
    return await db.account.findUnique({
      where: { email },
      include: {
        sessions: true,
      },
    });
  } catch (error) {
    console.error(
      `[AccountService] Failed to fetch account (${email}):`,
      error
    );
    throw new DatabaseError("Failed to fetch account by email.");
  }
};

const isDevelopment = process.env.NODE_ENV === "development";

export const createAccount = async (
  data: Prisma.AccountCreateInput & {
    currency?: { name: string; description?: string };
  }
) => {
  try {
    const roleToAssign: Role = data.role ?? "BUYER";
    const { currency, ...rest } = data;

    return await db.$transaction(async (tx) => {
      const accountData: Prisma.AccountCreateInput = {
        ...rest,
        role: roleToAssign,
        isVerified: isDevelopment ? true : false, // Auto-verify in development
        emailVerifiedAt: isDevelopment ? new Date() : null, // Set verification date in development
        currency: currency
          ? {
              create: {
                name: currency.name,
                description: currency.description ?? "",
                accountId: rest.id ?? "",
              },
            }
          : undefined,
      };

      // Create the account
      const account = await tx.account.create({
        data: accountData,
      });

      // Create the audit log entry
      await tx.auditLog.create({
        data: {
          action: "CREATE_ACCOUNT",
          accountId: account.id,
          reason: isDevelopment
            ? "Account created and auto-verified (development)"
            : "Account created",
        },
      });

      return account;
    });
  } catch (error) {
    console.error("[AccountService] Failed to create account:", error);
    if (error instanceof PermissionError) throw error;
    throw new DatabaseError("Failed to create account.");
  }
};

// update Account
export const updateAccount = async (
  id: string,
  data: Prisma.AccountUpdateInput
) => {
  try {
    // Find the existing account first to ensure it exists
    const existingAccount = await db.account.findUnique({
      where: { id },
    });

    if (!existingAccount) {
      throw new NotFoundError(`Account with ID ${id} not found.`);
    }

    // Update the account in the database
    const updatedAccount = await db.account.update({
      where: { id },
      data,
    });

    // Optionally, create an audit log entry for the update
    await db.auditLog.create({
      data: {
        action: "UPDATE_ACCOUNT",
        accountId: id,
        reason: "Account updated",
      },
    });

    return updatedAccount;
  } catch (error) {
    console.error(`[AccountService] Failed to update account (${id}):`, error);
    if (error instanceof NotFoundError) throw error;
    throw new DatabaseError("Failed to update account.");
  }
};

// Delete account
export const deleteAccount = async (id: string) => {
  try {
    const existing = await db.account.findUnique({ where: { id } });
    if (!existing) throw new NotFoundError(`Account (${id}) not found.`);

    return await db.$transaction(async (tx) => {
      const deleted = await tx.account.delete({
        where: { id },
      });

      await tx.auditLog.create({
        data: {
          action: "DELETE_ACCOUNT",
          accountId: id,
          reason: "Account deleted",
        },
      });

      return deleted;
    });
  } catch (error) {
    console.error(`[AccountService] Failed to delete account (${id}):`, error);
    if (error instanceof NotFoundError) throw error;
    throw new DatabaseError("Failed to delete account.");
  }
};

// Log login attempt (success or fail)
export const logLoginAttempt = async ({
  email,
  success,
  ipAddress,
  userAgent,
}: {
  email: string;
  success: boolean;
  ipAddress?: string;
  userAgent?: string;
}): Promise<LoginAttempt> => {
  try {
    // Ensure email is always a string
    const validEmail = email ?? "unknown";

    return await db.loginAttempt.create({
      data: {
        email: validEmail,
        success,
        ipAddress,
        userAgent,
      },
    });
  } catch (error) {
    console.error("[AccountService] Failed to log login attempt:", error);
    throw new DatabaseError("Failed to log login attempt.");
  }
};

// Save refresh token session
export const saveSession = async ({
  accountId,
  refreshToken,
  expiresAt,
  ipAddress,
  userAgent,
}: {
  accountId: string;
  refreshToken: string;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
}): Promise<Session> => {
  try {
    return await db.session.create({
      data: {
        accountId,
        refreshToken,
        expiresAt,
        ipAddress,
        userAgent,
      },
    });
  } catch (error) {
    console.error("[AccountService] Failed to save session:", error);
    throw new DatabaseError("Failed to save session.");
  }
};

// Update lastLoginAt
export const updateLastLogin = async (accountId: string): Promise<void> => {
  try {
    await db.account.update({
      where: { id: accountId },
      data: {
        lastLoginAt: new Date(),
      },
    });
  } catch (error) {
    console.error(`[AccountService] Failed to update lastLoginAt:`, error);
    throw new DatabaseError("Failed to update last login.");
  }
};

// Get recent failed login attempts (for rate-limiting)
export const getRecentFailedAttempts = async ({
  email,
  withinMinutes = 15,
}: {
  email: string;
  withinMinutes?: number;
}): Promise<number> => {
  try {
    const since = new Date(Date.now() - withinMinutes * 60 * 1000);

    const count = await db.loginAttempt.count({
      where: {
        email,
        success: false,
        createdAt: {
          gte: since,
        },
      },
    });

    return count;
  } catch (error) {
    console.error("[AccountService] Failed to get failed attempts:", error);
    throw new DatabaseError("Failed to get recent failed login attempts.");
  }
};

// Fetch account by referral code
export const getAccountByReferralCode = async (referralCode: string) => {
  try {
    return await db.account.findUnique({
      where: { referralCode },
    });
  } catch (error) {
    console.error(
      `[AccountService] Failed to fetch account by referralCode (${referralCode}):`,
      error
    );
    throw new DatabaseError("Failed to fetch account by referral code.");
  }
};

// Create referral entry
export const createReferral = async (
  referrerId: string,
  referredId: string
) => {
  try {
    return await db.referral.create({
      data: {
        referrerId,
        referredId,
      },
    });
  } catch (error) {
    console.error(
      `[AccountService] Failed to create referral from ${referrerId} to ${referredId}:`,
      error
    );
    throw new DatabaseError("Failed to create referral.");
  }
};
