// src/lib/auth/auth.ts
import { getServerSession } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import { db } from "@/lib/db/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { mapOAuthaccountToAppaccount } from "@/lib/auth/authUtils";
import { generateReferralCode } from "../referral/referralUtils";
import { Role } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    // Credentials provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const account = await db.account.findUnique({
          where: { email: credentials.email },
        });
        if (!account || !account.password || !account.isVerified) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          account.password
        );
        if (!isValid) return null;

        return {
          id: account.id,
          email: account.email!,
          role: account.role,
          hasProfile: !!account.name && !!account.profileImage,
          isVerified: account.isVerified,
        };
      },
    }),

    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile",
        },
      },
    }),

    // GitHub OAuth
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      profile(profile) {
        if (!profile.email) {
          throw new Error("GitHub account does not provide an email");
        }
        return {
          id: profile.id.toString(),
          email: profile.email,
          name: profile.name || "",
          profileImage: profile.avatar_url || "",
          role: Role.BUYER,
          isVerified: true,
          hasProfile: Boolean(profile.name && profile.avatar_url),
        };
      },
    }),
  ],

  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.hasProfile = user.hasProfile;
        token.isVerified = user.isVerified;
      } else if (token.email) {
        let dbAccount = await db.account.findUnique({
          where: { email: token.email },
        });
        if (!dbAccount) {
          const o = mapOAuthaccountToAppaccount({
            id: token.sub || (token.id as string),
            email: token.email,
            name: token.name || undefined,
            avatar: token.picture || undefined,
          });
          dbAccount = await db.account.create({
            data: {
              email: o.email,
              name: o.name || "",
              profileImage: o.profileImage || "",
              role: Role.BUYER,
              isVerified: true,
              referralCode: generateReferralCode(),
            },
          });
        }
        token.id = dbAccount.id;
        token.email = dbAccount.email ?? "";
        token.role = dbAccount.role;
        token.hasProfile = Boolean(dbAccount.name && dbAccount.profileImage);
        token.isVerified = dbAccount.isVerified;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        role: token.role as Role,
        hasProfile: token.hasProfile as boolean,
        isVerified: token.isVerified as boolean,
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export async function getUserSession() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return null;
  return session.user;
}
