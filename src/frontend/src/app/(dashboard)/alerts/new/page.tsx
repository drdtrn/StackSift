import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'New Alert Rule | StackSift' };

/**
 * New alert rule builder — maps to URL: /alerts/new
 *
 * Final implementation (US-06): multi-step form with React Hook Form + Zod:
 *   Step 1 — select metric (error rate, log volume, latency)
 *   Step 2 — configure threshold + evaluation window
 *   Step 3 — set notification channel (email, Slack)
 */
export default function NewAlertPage() {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold">New Alert Rule</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Configure when StackSift should fire an alert.
        </p>
      </div>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-500 text-sm">
        Alert rule builder (multi-step form) coming in US-06.
      </div>
    </div>
  );
}
