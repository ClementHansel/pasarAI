// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Module‐augmentation to teach NextAuth’s `User` about `hasProfile`
declare module "next-auth" {
  interface User {
    id: string;
    role: string;
    hasProfile: boolean;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      hasProfile: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    role: string;
    hasProfile?: boolean;
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
