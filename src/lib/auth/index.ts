import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { verifyPassword } from "@/lib/auth/authUtils";
import { findAccountByEmail } from "./accountService";
import { db } from "@/lib/db/db";
import { Role } from "@prisma/client";

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
        if (
          !account ||
          typeof account.email !== "string" ||
          typeof account.password !== "string" ||
          typeof account.role !== "string"
        ) {
          throw new Error("Invalid account data");
        }

        const isValid = await verifyPassword(
          credentials.password,
          account.password
        );
        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        // Only these three get passed into the JWT callback
        return {
          id: account.id,
          email: account.email,
          role: account.role as Role,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    // Called whenever a JWT is created or updated
    async jwt({ token, user, account, profile }) {
      if (user) {
        // Credentials or first‐time social sign-in
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.hasProfile = true; // credentials always complete
      }

      if (
        (account?.provider === "google" || account?.provider === "github") &&
        profile?.email
      ) {
        const dbUser = await db.account.findUnique({
          where: { email: profile.email },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.email = dbUser.email || "";
          token.role = dbUser.role;
          // mark complete only if all required fields exist
          token.hasProfile = Boolean(
            dbUser.address && dbUser.phone && dbUser.country
          );
        } else {
          // new social‐only user → needs to complete profile
          token.id = "";
          token.email = profile.email;
          token.role = "";
          token.hasProfile = false;
        }
      }

      return token;
    },

    // Called whenever session is checked (getSession, useSession, etc.)
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.hasProfile = token.hasProfile === true;
      return session;
    },

    // redirect no longer gets token
    async redirect({ url, baseUrl }) {
      // if you need to guard incomplete profiles, do it in middleware
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
