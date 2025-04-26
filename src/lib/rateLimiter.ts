// src/lib/rateLimiter.ts
import { createClient } from "redis";

// --- Redis Client Setup ---
const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
const redis = createClient({ url: redisUrl });

redis.on("error", (err) => console.error("[Redis] Redis Error:", err));
redis.on("connect", () => console.log("[Redis] Redis Connected"));

if (!redis.isOpen) {
  redis.connect();
}

// --- Rate Limiter Settings ---
const WINDOW_SECONDS = 60; // 60 seconds window
const MAX_REQUESTS = 10; // Max 10 requests per window

export class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RateLimitError";
  }
}

// --- Rate Limiter Function ---
export const rateLimiter = async (key: string) => {
  const redisKey = `ratelimit:${key}`;

  const pipeline = redis.multi();

  pipeline.incr(redisKey);
  pipeline.expire(redisKey, WINDOW_SECONDS);

  const results = await pipeline.exec();

  if (!results) {
    throw new Error("Failed to execute Redis pipeline.");
  }

  // In redis@4, results = [number, number]
  const incrResult = results[0] as number; // incremented count
  const expireResult = results[1] as number; // expire command result (usually 1 or 0)

  if (typeof incrResult !== "number") {
    throw new Error("Unexpected Redis response.");
  }

  if (expireResult !== 1) {
    console.warn(`[RateLimiter] Failed to set expiration for key ${redisKey}.`);
  }

  const currentCount = incrResult;

  if (currentCount > MAX_REQUESTS) {
    throw new RateLimitError("Rate limit exceeded. Try again later.");
  }

  return {
    remaining: Math.max(0, MAX_REQUESTS - currentCount),
    resetIn: WINDOW_SECONDS,
  };
};
