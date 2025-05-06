// // src/lib/ai/agent/agentTypes.ts

// // Roles for the agent
// export type AgentRole = "buyer" | "seller" | "admin";

// // Incoming message from frontend/user
// export interface AgentMessage {
//   sender: string; // e.g., userId or username
//   role: AgentRole;
//   content: string; // The message content from the user
//   timestamp?: string; // Optional timestamp of the message
// }

// // All known task types that agents can handle
// export type AgentIntent =
//   | "ANALYZE_SALES"
//   | "SUGGEST_PRODUCT"
//   | "GENERATE_REPORT"
//   | "UNKNOWN";

// // More specific payload type for task delegation
// export interface TaskPayload {
//   content: string; // Message content
//   payload: Record<string, unknown>; // Additional data (e.g., filters, configurations)
//   filters?: Record<string, string | number | boolean>; // Optional filters for task execution (e.g., date ranges, categories)
// }

// // Task passed from LLM to task router
// export interface AgentTask {
//   type: AgentIntent; // The type of intent (e.g., ANALYZE_SALES, SUGGEST_PRODUCT)
//   payload: TaskPayload; // Payload containing content, data, and filters
//   accountId: string; // User's account ID
//   role: AgentRole; // The role of the user initiating the task (buyer, seller, admin)
// }

// // Response from any agent (e.g., analytics, suggest, etc.)
// export interface AgentTaskResult {
//   reply: string; // The response from the agent (text response)
//   meta?: Record<string, unknown>; // Optional metadata (e.g., logs, data used)
// }

// // Final response sent to the frontend
// export interface AgentResponse {
//   success: boolean; // Indicates if the task was successful
//   reply: string; // The reply text that will be shown to the user
//   meta?: Record<string, unknown> | null; // Optional metadata (e.g., task status, debug info)
// }
