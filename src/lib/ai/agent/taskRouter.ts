// // src/lib/ai/agent/taskRouter.ts

// import type { AgentTask, AgentTaskResult } from "./agentTypes";
// import { handleAnalyticsTask } from "./analyticsAgent";
// import { handleSuggestTask } from "./suggestAgent";
// import { handleReportTask } from "./reportAgent";

// /**
//  * Dispatches a task to the appropriate agent based on its type.
//  *
//  * @param task - The task to be routed to the appropriate agent
//  * @returns A result object containing the reply and metadata from the agent's response
//  */
// export async function dispatchTask(task: AgentTask): Promise<AgentTaskResult> {
//   try {
//     const { type } = task; // Extract the type of the task (ANALYZE_SALES, SUGGEST_PRODUCT, etc.)

//     // Route the task to the appropriate handler based on the task type
//     switch (type) {
//       case "ANALYZE_SALES":
//         return await handleAnalyticsTask(task); // Route to analytics agent
//       case "SUGGEST_PRODUCT":
//         return await handleSuggestTask(task); // Route to suggestion agent
//       case "GENERATE_REPORT":
//         return await handleReportTask(task); // Route to reporting agent
//       default:
//         // Return a fallback result if the task type is unknown
//         return {
//           reply: "Sorry, I cannot process this type of request at the moment.",
//           meta: {},
//         };
//     }
//   } catch (error) {
//     console.error("[Task Router Error]", error);
//     // Return a default error message if an exception occurs during task routing
//     return {
//       reply: "There was an error routing the task. Please try again later.",
//       meta: {},
//     };
//   }
// }
