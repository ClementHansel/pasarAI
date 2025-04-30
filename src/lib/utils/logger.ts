// src/lib/utils/logger.ts

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogPayload {
  level: LogLevel;
  message: string;
  data?: Record<string, unknown>;
  timestamp?: string;
  tag?: string;
}

const shouldSendToServer = true; // Set to false in development if needed
const defaultTag = "AppLog";

/**
 * Send log data to backend server (/api/log)
 */
async function sendToServer(payload: LogPayload) {
  try {
    await fetch("/api/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, timestamp: new Date().toISOString() }),
    });
  } catch (err) {
    console.warn("[Logger] Failed to send to server:", err);
  }
}

/**
 * Core logger function
 */
function log(
  level: LogLevel,
  message: string,
  data?: Record<string, unknown>,
  tag = defaultTag
) {
  const timestamp = new Date().toISOString();
  const payload: LogPayload = { level, message, data, timestamp, tag };

  // Console logging
  switch (level) {
    case "info":
      console.info(`[${tag}] ${message}`, data ?? "");
      break;
    case "warn":
      console.warn(`[${tag}] ${message}`, data ?? "");
      break;
    case "error":
      console.error(`[${tag}] ${message}`, data ?? "");
      break;
    case "debug":
      console.debug(`[${tag}] ${message}`, data ?? "");
      break;
  }

  // Optional: send to backend server
  if (shouldSendToServer) {
    sendToServer(payload);
  }
}

// Exported log functions
export const Logger = {
  info: (msg: string, data?: Record<string, unknown>, tag?: string) =>
    log("info", msg, data, tag),

  warn: (msg: string, data?: Record<string, unknown>, tag?: string) =>
    log("warn", msg, data, tag),

  error: (msg: string, data?: Record<string, unknown>, tag?: string) =>
    log("error", msg, data, tag),

  debug: (msg: string, data?: Record<string, unknown>, tag?: string) =>
    log("debug", msg, data, tag),
};
