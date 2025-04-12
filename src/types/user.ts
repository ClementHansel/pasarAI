// src/types/user.ts

export type User = {
  id: number;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date | null; // Track last login time
  profileImageUrl?: string | null; // Optional profile image URL
  role: UserRole; // User role (e.g., 'admin', 'user')
};

export type CreateUserInput = {
  email: string;
  name?: string | null;
  password: string; // Ensure password field for user creation
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

// Role-based Access Control (RBAC) - Different roles users can have
export type UserRole = "user" | "admin" | "manager";

// Error handling types for user-related operations
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
  role: UserRole;
  iat: number; // issued at timestamp
  exp: number; // expiration timestamp
};
