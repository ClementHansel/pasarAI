// src/lib/auth/index.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/lib/auth/authUtils";
import { findAccountByEmail } from "./accountService";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password required");
        }

        const account = await findAccountByEmail(credentials.email);

        if (!account || !account.hashedPassword) {
          throw new Error("No account found");
        }

        const isValid = await verifyPassword(
          credentials.password,
          account.hashedPassword
        );

        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: account.id,
          email: account.email,
          role: account.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id = account.id;
        token.role = account.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.account) {
        session.account.id = token.id;
        session.account.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login", // optional: custom login page
    error: "/auth/error", // optional: error redirect
  },
  secret: process.env.NEXTAUTH_SECRET,
};
