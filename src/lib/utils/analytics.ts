// src/lib/utils/analytics.ts

import { AnalyticsEventInput } from "../validation/analyticsSchema";

type AnalyticsEvent<T = Record<string, unknown>> = {
  eventName: string;
  userId?: string;
  metadata?: T;
  timestamp?: string;
};

const isProduction = process.env.NODE_ENV === "production";

// Tracks a single event.
export function trackEvent<T = Record<string, unknown>>(
  event: AnalyticsEvent<T>
) {
  const eventWithTimestamp: AnalyticsEvent<T> = {
    ...event,
    timestamp: event.timestamp ?? new Date().toISOString(),
  };

  if (isProduction) {
    sendToAnalyticsAPI([eventWithTimestamp]);
  } else {
    console.debug("🔍 [DEV] Analytics event:", eventWithTimestamp);
  }
}

// Tracks multiple events at once. Ideal for batching or debounce scenarios.
export function trackEventBatch<T = Record<string, unknown>>(
  events: AnalyticsEvent<T>[]
) {
  const enriched: AnalyticsEvent<T>[] = events.map((event) => ({
    ...event,
    timestamp: event.timestamp ?? new Date().toISOString(),
  }));

  if (isProduction) {
    sendToAnalyticsAPI(enriched);
  } else {
    console.debug("🔍 [DEV] Analytics batch:", enriched);
  }
}

// Internal function to send events to the analytics backend.
async function sendToAnalyticsAPI<T = Record<string, unknown>>(
  events: AnalyticsEvent<T>[]
) {
  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ events }),
    });
  } catch (error) {
    console.error("Failed to send analytics events:", error);
  }
}

// Emit an event (simplified until the dashboard analytic BE ready)
export async function emitAnalyticsEvent(event: AnalyticsEventInput) {
  const enrichedEvent = {
    eventName: event.eventName,
    metadata: {
      widgetId: event.widgetId,
      widgetType: event.widgetType,
      action: event.action,
      accountId: event.accountId,
      ...(event.metadata ?? {}),
    },
  };

  trackEvent(enrichedEvent);
}
