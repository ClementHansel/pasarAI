// src/lib/ai/agent/llmAgent.ts

import type { AgentTask, AgentTaskResult } from "./agentTypes";
import { handleAnalyticsTask } from "./analyticsAgent";
import { handleSuggestTask } from "./suggestAgent";
import { handleReportTask } from "./reportAgent";

/**
 * Detect the intent of the user based on the message content.
 * @param message - The user's message.
 * @returns The detected intent.
 */
function detectIntent(message: string): string {
  // Lowercasing the message for case-insensitive comparison
  const lowerCaseMessage = message.toLowerCase();

  if (
    lowerCaseMessage.includes("sales trend") ||
    lowerCaseMessage.includes("sales analysis")
  ) {
    return "ANALYZE_SALES";
  } else if (
    lowerCaseMessage.includes("recommendation") ||
    lowerCaseMessage.includes("suggest")
  ) {
    return "SUGGEST_PRODUCT";
  } else if (
    lowerCaseMessage.includes("report") ||
    lowerCaseMessage.includes("summary")
  ) {
    return "GENERATE_REPORT";
  } else {
    return "UNKNOWN"; // If no known intent is found
  }
}

/**
 * This agent processes user input, identifies the intent, and delegates the task to the appropriate agent.
 * - Analytics tasks: e.g., sales trends, buyer behavior
 * - Suggestion tasks: e.g., product recommendations
 * - Reporting tasks: e.g., daily sales report
 */
export async function handleLLMTask(task: AgentTask): Promise<AgentTaskResult> {
  try {
    const { payload } = task;

    // Initialize reply and meta, ensuring meta is always an object
    let reply = "";
    let meta: Record<string, unknown> = {}; // Default to an empty object for meta

    // Extract message content from task payload
    const message = payload.content;

    // Use detectIntent function to determine the task's intent
    const intent = detectIntent(message);

    // Handle different task intents based on the detected intent
    if (intent === "ANALYZE_SALES") {
      // Handle analytics task
      const analyticsResponse = await handleAnalyticsTask({
        ...task,
        payload: {
          ...payload,
          content: "sales trend",
        },
      });
      reply = analyticsResponse.reply;
      meta = analyticsResponse.meta || {}; // Ensure meta is always an object
    } else if (intent === "SUGGEST_PRODUCT") {
      // Handle product suggestion task
      const suggestResponse = await handleSuggestTask({
        ...task,
        payload: {
          ...payload,
          content: "product suggestion",
        },
      });
      reply = suggestResponse.reply;
      meta = suggestResponse.meta || {}; // Ensure meta is always an object
    } else if (intent === "GENERATE_REPORT") {
      // Handle reporting task
      const reportResponse = await handleReportTask({
        ...task,
        payload: {
          ...payload,
          content: "report",
        },
      });
      reply = reportResponse.reply;
      meta = reportResponse.meta || {}; // Ensure meta is always an object
    } else {
      // Fallback if the message is unrecognized
      reply =
        "I'm sorry, I didn't quite catch that. Can you clarify your request?";
    }

    return { reply, meta };
  } catch (error) {
    console.error("[LLM Agent Error]", error);
    return {
      reply:
        "There was an error processing your request. Please try again later.",
      meta: {}, // Return empty metadata in case of an error
    };
  }
}
