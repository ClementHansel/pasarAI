// src/types/next-auth.d.ts
import "next-auth";
import { Role } from "@prisma/client";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      email: string;
      role: Role;
      hasProfile: boolean;
      isVerified: boolean;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    role: Role;
    hasProfile: boolean;
    isVerified: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    role: Role;
    hasProfile: boolean;
    isVerified: boolean;
  }
}
