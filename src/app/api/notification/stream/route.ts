import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const stream = new ReadableStream({
    start(controller) {
      let count = 1;

      // Send an initial message
      controller.enqueue(encodeSSE(`Notification ${count}`));
      count++;

      // Send notifications every 5 seconds
      const interval = setInterval(() => {
        controller.enqueue(encodeSSE(`Notification ${count}`));
        count++;
      }, 5000);

      // Stop sending if the request is aborted (client disconnects)
      req.signal?.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  const headers = new Headers({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  return new NextResponse(stream, { headers });
}

// Helper to encode data into SSE format
function encodeSSE(data: string): Uint8Array {
  return new TextEncoder().encode(`data: ${data}\n\n`);
}
