// lib/session/session.ts
import { NextApiRequest } from "next";
import type { SessionData } from "@/types/cart";

const sessionStore = new Map<string, SessionData>();

const getSessionKey = (req: NextApiRequest): string => {
  return req.headers["x-session-id"]?.toString() || "demo-session";
};

export const getSession = (req: NextApiRequest): SessionData => {
  const key = getSessionKey(req);
  return sessionStore.get(key) || { cart: [] };
};

export const setSession = (req: NextApiRequest, data: SessionData): void => {
  const key = getSessionKey(req);
  sessionStore.set(key, data);
};
