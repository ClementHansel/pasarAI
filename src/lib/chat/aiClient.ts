export async function callAI(prompt: string): Promise<string> {
  const API_KEY = process.env.OPENROUTER_API_KEY;
  const endpoint = "https://openrouter.ai/api/v1/chat/completions";

  if (!API_KEY) {
    console.error("Missing OpenRouter API key.");
    throw new Error("Server configuration error. Please try again later.");
  }

  const payload = {
    model: "mistral/mistral-7b-instruct", // You can switch to: openchat/openchat-7b
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ],
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://yourdomain.com", // ✅ Replace with your actual domain
        "X-Title": "YourAppName", // ✅ Replace with your app name
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("AI API Error:", error);
      throw new Error("AI response failed");
    }

    const data = await response.json();
    const message = data?.choices?.[0]?.message?.content;

    return message?.trim() || "No meaningful response from AI.";
  } catch (err) {
    console.error("AI call failed:", err);
    throw new Error("Failed to contact AI service. Please try again.");
  }
}
