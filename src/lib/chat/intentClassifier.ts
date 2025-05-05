export type Intent =
  | "GREET"
  | "ASK_AI"
  | "GET_HELP"
  | "REQUEST_REPORT"
  | "UNKNOWN";

interface ClassificationResult {
  intent: Intent;
  confidence: number; // 0 to 1 (mocked for now)
  keywords?: string[];
}

export function classifyIntent(message: string): ClassificationResult {
  const lower = message.toLowerCase();

  // Basic keyword intent matching
  if (/(hi|hello|hey|good morning|good evening)/.test(lower)) {
    return { intent: "GREET", confidence: 0.95, keywords: ["greeting"] };
  }

  if (/report|summary|data report/.test(lower)) {
    return { intent: "REQUEST_REPORT", confidence: 0.9, keywords: ["report"] };
  }

  if (/help|how to|guide/.test(lower)) {
    return { intent: "GET_HELP", confidence: 0.9, keywords: ["help"] };
  }

  if (/ai|assistant|ask|question/.test(lower)) {
    return { intent: "ASK_AI", confidence: 0.85, keywords: ["ai", "question"] };
  }

  return { intent: "UNKNOWN", confidence: 0.5 };
}
