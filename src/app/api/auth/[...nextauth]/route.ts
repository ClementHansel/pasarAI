// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Ensure all declarations of 'hasProfile' are consistent
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      hasProfile: boolean;
      isVerified: boolean;
    };
  }

  interface User {
    id: string;
    email: string;
    hasProfile: boolean;
    isVerified: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    hasProfile: boolean;
    isVerified: boolean;
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };