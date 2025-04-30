// src/services/notification/emailQueueService.ts

type EmailJob = {
  subject: string;
  recipient: string;
  text: string;
  attempts?: number;
};

const MAX_RETRIES = 3;
const emailQueue: EmailJob[] = [];
const deadLetterQueue: EmailJob[] = [];

let isProcessing = false;

// Logs queue activity
function logQueueActivity(event: string, data: Record<string, unknown>) {
  console.log(`[EmailQueue] ${event}:`, data);
  fetch("/api/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, data, timestamp: new Date().toISOString() }),
  }).catch((e) => console.error("Log failed:", e));
}

// Sends alert notification to admin or internal system
function sendAlertNotification(subject: string, details: string) {
  // Here the logic to send a push internally. For now, just log it.
  console.warn(`[ALERT] ${subject}: ${details}`);

  fetch("/api/notification", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      accountId: "internal-alert",
      type: "push",
      title: subject,
      message: details,
    }),
  }).catch((e) => console.error("Alert send failed:", e));
}

// Sends email using backend
async function sendEmailNow(job: EmailJob): Promise<void> {
  const res = await fetch("/api/notification/sendEmail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      subject: job.subject,
      recipient: job.recipient,
      text: job.text,
    }),
  });

  if (!res.ok) {
    let errMsg = "Unknown error";
    try {
      const json = await res.json();
      errMsg = json.error ?? res.statusText;
    } catch {
      errMsg = res.statusText;
    }
    throw new Error(errMsg);
  }
}

// Main processing loop for the queue
async function processQueue() {
  if (isProcessing) return;
  isProcessing = true;

  while (emailQueue.length > 0) {
    const job = emailQueue.shift();
    if (!job) continue;

    try {
      logQueueActivity("SendingEmail", { ...job });
      await sendEmailNow(job);
      logQueueActivity("EmailSent", { recipient: job.recipient });
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      const attempts = job.attempts ?? 0;

      logQueueActivity("EmailFailed", {
        recipient: job.recipient,
        error: error.message,
        attempt: attempts + 1,
      });

      if (attempts + 1 < MAX_RETRIES) {
        emailQueue.push({ ...job, attempts: attempts + 1 });
        logQueueActivity("RetryScheduled", {
          recipient: job.recipient,
          retryAttempt: attempts + 1,
        });
      } else {
        logQueueActivity("MaxRetriesReached", {
          recipient: job.recipient,
          finalError: error.message,
        });

        deadLetterQueue.push({ ...job, attempts: attempts + 1 });

        sendAlertNotification(
          "Email Delivery Failed",
          `Email to ${job.recipient} failed after ${MAX_RETRIES} attempts. Error: ${error.message}`
        );
      }
    }
  }

  isProcessing = false;
}

// Public method to enqueue email
export function enqueueEmail(job: EmailJob): void {
  emailQueue.push({ ...job, attempts: 0 });
  logQueueActivity("EmailEnqueued", job);
  processQueue().catch((err) => {
    const error = err instanceof Error ? err : new Error("Unknown queue error");
    logQueueActivity("QueueProcessingError", { error: error.message });
  });
}

// Debug info about queues
export function getQueueStatus() {
  return {
    activeQueueLength: emailQueue.length,
    deadLetterQueueLength: deadLetterQueue.length,
    isProcessing,
  };
}

// Retrieve all dead-letter jobs for UI or export
export function getDeadLetterQueue(): EmailJob[] {
  return [...deadLetterQueue];
}
