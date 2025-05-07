// src/lib/rateLimiter.ts

/**
 * Rate Limiter Implementation
 *
 * TEMPORARY IN-MEMORY IMPLEMENTATION
 * Currently using a Map for development. This is NOT suitable for production use.
 *
 * TODO: Redis Implementation
 * To enable Redis-based rate limiting:
 * 1. Set up docker-compose.yml with Redis service:
 *    ```yaml
 *    services:
 *      redis:
 *        image: redis:alpine
 *        ports:
 *          - "6379:6379"
 *    ```
 * 2. Add REDIS_URL to your .env:
 *    REDIS_URL=redis://localhost:6379
 * 3. Uncomment the Redis implementation below
 * 4. Run with docker-compose up
 */

// import { createClient } from "redis";

// Temporary in-memory store
const rateLimit = new Map<string, { count: number; resetTime: number }>();

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimit.entries()) {
    if (value.resetTime < now) {
      rateLimit.delete(key);
    }
  }
}, 5 * 60 * 1000);

export async function rateLimiter(ip: string) {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 10; // Max 10 requests per minute

  const current = rateLimit.get(ip);

  // Reset if window expired
  if (!current || current.resetTime < now) {
    rateLimit.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      remaining: maxRequests - 1,
      resetIn: windowMs / 1000,
    };
  }

  // Increment count
  current.count += 1;

  // Check if over limit
  if (current.count > maxRequests) {
    return Promise.reject(new Error("Rate limit exceeded. Try again later."));
  }

  return {
    remaining: maxRequests - current.count,
    resetIn: Math.ceil((current.resetTime - now) / 1000),
  };
}

/* Redis Implementation (Uncommented when ready)
const redis = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redis.on("error", (err) => console.warn("[Redis] Redis Error:", err));
redis.on("connect", () => console.log("[Redis] Redis Connected"));

export async function rateLimiter(ip: string) {
  try {
    if (!redis?.isOpen) {
      await redis.connect();
    }

    const redisKey = `ratelimit:${ip}`;
    const pipeline = redis.multi();

    pipeline.incr(redisKey);
    pipeline.expire(redisKey, 60);

    const results = await pipeline.exec();
    if (!results) {
      return { remaining: 10 };
    }

    const currentCount = results[0] as number;
    if (currentCount > 10) {
      throw new Error("Rate limit exceeded. Try again later.");
    }

    return {
      remaining: Math.max(0, 10 - currentCount),
      resetIn: 60,
    };
  } catch (err) {
    console.warn("[RateLimiter] Error:", err);
    throw err;
  }
}
*/
