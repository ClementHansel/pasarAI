// src/types/user.ts

import { Role } from "@prisma/client"; // Import Prisma enum Role

export type SocialProvider = "google" | "github" | "credentials";

// Use Account as the main model for backend, but keep User for frontend types if needed
export type Account = {
  id: string;
  email: string;
  name: string | null;
  password?: string;
  avatar?: string;
  role: "SELLER" | "BUYER" | "ADMIN";
  phone?: string | null;
  address?: string | null;
  country?: string | null;
  province?: string | null;
  city?: string | null;
  profileImage?: string | null;
  referralCode?: string | null;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  lastLoginAt?: Date | null;
};

export type User = {
  id: number | string;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date | null;
  profileImageUrl?: string | null;
  role: Role; // Use Prisma Role enum
  provider?: SocialProvider;
  address?: string | null;
  phone?: string | null;
  // Add any other fields that may be missing for social users
};

export type CreateUserInput = {
  email: string;
  name?: string | null;
  password: string;
};

export type UpdateUserInput = {
  email?: string;
  name?: string | null;
  profileImageUrl?: string | null;
};

export type UserWithPosts = User & {
  posts: Post[];
};

export type Post = {
  id: number;
  title: string;
  content: string;
  published: boolean;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

// ✅ Use Prisma enum Role instead of string union
export type UserRole = Role;

export type UserCreationError = {
  emailAlreadyExists?: boolean;
  invalidEmailFormat?: boolean;
  passwordTooWeak?: boolean;
};

export type UserAuthenticationError = {
  invalidCredentials?: boolean;
  accountLocked?: boolean;
  accountNotFound?: boolean;
};

export type JwtPayload = {
  userId: number;
  email: string;
  role: Role; // ✅ Align JWT payload with enum
  iat: number;
  exp: number;
};
