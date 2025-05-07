// src/lib/ai/agent/route.ts

import { dispatchTask } from "./taskRouter";
import type {
  AgentMessage,
  AgentResponse,
  AgentTask,
  AgentIntent,
  TaskPayload,
} from "./agentTypes";

/**
 * Detects the intent of the user message.
 * @param message - AgentMessage object from the user
 * @returns The detected intent as an AgentIntent
 */
function detectIntent(message: AgentMessage): AgentIntent {
  const content = message.content.toLowerCase();

  if (content.includes("sales trend") || content.includes("sales analysis")) {
    return "ANALYZE_SALES"; // Return valid AgentIntent value
  } else if (
    content.includes("recommendation") ||
    content.includes("suggest")
  ) {
    return "SUGGEST_PRODUCT"; // Return valid AgentIntent value
  } else if (content.includes("report") || content.includes("summary")) {
    return "GENERATE_REPORT"; // Return valid AgentIntent value
  } else {
    return "UNKNOWN"; // Return valid AgentIntent value
  }
}

/**
 * Handles a full agent request from a chat message.
 * 1. Detects the user's intent
 * 2. Routes the task to the correct agent
 * 3. Returns a formatted response for the frontend
 * @param message - The AgentMessage object from the user
 * @returns AgentResponse - The formatted response for the frontend
 */
export async function handleAgentMessage(
  message: AgentMessage
): Promise<AgentResponse> {
  try {
    // 1. Detect the user's intent using the LLM
    const intent = detectIntent(message); // Directly detect the intent here

    // 2. Build a task based on the intent and message
    const taskPayload: TaskPayload = {
      content: message.content,
      payload: {}, // Provide an empty object for now or add required fields
    };

    const task: AgentTask = {
      type: intent, // Now type is correctly assigned as an AgentIntent
      payload: taskPayload, // Attach the correctly structured payload
      accountId: message.sender, // Renaming userId to accountId as per the schema
      role: message.role,
    };

    // 3. Route the task to the correct agent
    const result = await dispatchTask(task); // Dispatch the task to the appropriate agent

    // 4. Return the agent's response
    return {
      success: true,
      reply: result.reply,
      meta: result.meta || null, // Ensure that meta is always returned or null
    };
  } catch (error) {
    console.error("[Agent Error]", error);
    return {
      success: false,
      reply: "Sorry, something went wrong processing your request.",
      meta: null, // Return null meta on error
    };
  }
}
