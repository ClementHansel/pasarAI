// src/types/auditLog.ts

export interface AuditLog {
  action: string; // Action performed (e.g., CANCEL_ORDER)
  orderId: string; // The order ID associated with the action
  user: string; // The user who performed the action (e.g., customer ID, admin ID)
  reason?: string; // Optional reason for the action (e.g., cancellation reason)
  timestamp: string; // The timestamp of when the action was performed
}
