// src/lib/ai/agent/suggestAgent.ts

import type { AgentTask, AgentTaskResult } from "./agentTypes";

/**
 * Handles the 'Suggest Product' task.
 * This function generates product suggestions based on the provided task details.
 * @param task - The task object containing the intent, payload, and other metadata.
 * @returns A response containing the product suggestions or an error message.
 */
export async function handleSuggestTask(
  task: AgentTask
): Promise<AgentTaskResult> {
  try {
    const { payload, accountId, role } = task; // Extracting relevant data from the task
    const content = payload.content.toLowerCase();
    let reply = "";
    const meta: Record<string, unknown> = {}; // Initialize meta as an empty object

    // Check if the task is related to product suggestions
    if (content.includes("recommendation") || content.includes("suggest")) {
      // Handle product suggestion based on user role and content
      reply = await generateProductSuggestions(accountId, role);
    } else {
      // Fallback if the suggestion type is unrecognized
      reply =
        "Sorry, I couldn't provide a suggestion at this time. Please try again.";
    }

    return {
      reply,
      meta, // Returning the meta data (empty object in this case)
    };
  } catch (error) {
    console.error("[Suggest Agent Error]", error);
    return {
      reply:
        "There was an error generating the product suggestion. Please try again later.",
      meta: {},
    };
  }
}

/**
 * Generates product suggestions based on the user role and request content.
 * @param accountId - The account ID for the user requesting the suggestion.
 * @param role - The role of the user (buyer, seller, admin)
 * @returns A string containing the product suggestions.
 */
async function generateProductSuggestions(
  accountId: string,
  role: string
): Promise<string> {
  // Mock implementation of product suggestion logic
  // This could later be replaced with database/API calls to get personalized recommendations

  const products = [
    { name: "Product A", category: "Electronics", price: 100 },
    { name: "Product B", category: "Home Goods", price: 50 },
    { name: "Product C", category: "Books", price: 15 },
  ];

  let suggestions = `Here are some product recommendations for you:\n`;

  // Example product list suggestion
  products.forEach((product) => {
    suggestions += `- ${product.name} (${product.category}): $${product.price}\n`;
  });

  // Customize the product suggestions based on the user’s role
  if (role === "admin") {
    suggestions +=
      "\nAdmin Insights: These products have been top sellers in the last month!";
  } else if (role === "buyer") {
    suggestions +=
      "\nBuyer Insights: You might like these products based on your past purchases.";
  } else if (role === "seller") {
    suggestions +=
      "\nSeller Insights: These products are currently trending, and you might want to list similar ones.";
  }

  return suggestions;
}
