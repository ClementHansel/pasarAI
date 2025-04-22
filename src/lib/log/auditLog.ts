// src/lib/auditLog.ts

import { AuditLog } from "@/types/auditLog";

// In-memory store for audit logs (you can replace this with a database)
const auditLogs: AuditLog[] = [];

// Function to log an action
export const logAudit = (
  action: string,
  orderId: string,
  user: string,
  reason?: string
) => {
  const timestamp = new Date().toISOString();
  const logEntry: AuditLog = {
    action,
    orderId,
    user,
    reason,
    timestamp,
  };

  // Add the log entry to the in-memory audit log store
  auditLogs.push(logEntry);

  // For a real-world implementation, you would store the log in a database
  // Example: db.collection("auditLogs").insertOne(logEntry);
};

// Function to get all audit logs (for debugging or admin purposes)
export const getAuditLogs = (): AuditLog[] => {
  return auditLogs;
};
