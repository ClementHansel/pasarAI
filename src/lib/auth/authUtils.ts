// arc/lib/auth/authUtils.ts
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { randomBytes } from "crypto";

// --- ENV CONFIG ---
const JWT_SECRET = process.env.JWT_SECRET ?? "dev_secret";
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET ?? "dev_refresh_secret";
const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

// --- Custom Role Type ---
type Role = "ADMIN" | "BUYER" | "SELLER";

// --- PASSWORD UTILS ---
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(
  plainText: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainText, hashedPassword);
}

// --- TOKEN PAYLOAD TYPES ---
export type AccessTokenPayload = {
  sub: string;
  email: string;
  role: Role;
};

export type RefreshTokenPayload = {
  sub: string;
  version: number;
};

// --- TOKEN GENERATION ---
export function generateAccessToken(account: {
  id: string;
  email: string;
  role: Role;
}): string {
  return jwt.sign(
    {
      sub: account.id,
      email: account.email,
      role: account.role,
    },
    JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
  );
}

export function generateRefreshToken(account: {
  id: string;
  tokenVersion: number;
}): string {
  return jwt.sign(
    {
      sub: account.id,
      version: account.tokenVersion,
    },
    JWT_REFRESH_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
  );
}

// --- TOKEN VERIFICATION ---
export function verifyAccessToken(token: string): AccessTokenPayload {
  const decoded = jwt.verify(token, JWT_SECRET);

  if (typeof decoded !== "object" || decoded === null) {
    throw new Error("Invalid access token");
  }

  const { sub, email, role } = decoded as AccessTokenPayload;

  if (
    typeof sub !== "string" ||
    typeof email !== "string" ||
    typeof role !== "string"
  ) {
    throw new Error("Malformed access token payload");
  }

  return { sub, email, role };
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  const decoded = jwt.verify(token, JWT_REFRESH_SECRET);

  if (typeof decoded !== "object" || decoded === null) {
    throw new Error("Invalid refresh token");
  }

  const { sub, version } = decoded as RefreshTokenPayload;

  if (typeof sub !== "string" || typeof version !== "number") {
    throw new Error("Malformed refresh token payload");
  }

  return { sub, version };
}

// --- TOKEN ROTATION UTIL ---
export function generateTokenIdentifier(): string {
  return randomBytes(16).toString("hex");
}

// --- RBAC UTILS ---
export function hasRole(account: { role: Role }, requiredRole: Role): boolean {
  return account.role === requiredRole;
}

export function isAdmin(account: { role: Role }): boolean {
  return account.role === "ADMIN";
}

export function isSeller(account: { role: Role }): boolean {
  return account.role === "SELLER";
}

// --- OTP / MAGIC LINK UTILS ---
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function generateMagicLinkToken(email: string): string {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: "10m" });
}

export function verifyMagicLinkToken(token: string): { email: string } {
  const decoded = jwt.verify(token, JWT_SECRET);

  if (
    typeof decoded !== "object" ||
    decoded === null ||
    typeof (decoded as JwtPayload).email !== "string"
  ) {
    throw new Error("Invalid magic link token");
  }

  return { email: (decoded as JwtPayload).email };
}

// --- SOCIAL LOGIN HOOK ---
export function mapOAuthaccountToAppaccount(profile: {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}): {
  email: string;
  name: string;
  profileImage: string;
} {
  return {
    email: profile.email,
    name: profile.name ?? "OAuth account",
    profileImage: profile.avatar ?? "",
  };
}
