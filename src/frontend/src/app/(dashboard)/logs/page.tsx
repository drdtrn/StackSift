import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Log Explorer | StackSift' };

/**
 * Log Explorer page — maps to URL: /logs
 *
 * Final implementation (US-03): full-text search bar, filters (level,
 * project, time range), virtualised DataTable of log entries.
 * Data via useLogSearch TanStack Query hook + Elasticsearch backend.
 */
export default function LogsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Log Explorer</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Search and filter log entries across all your projects.
        </p>
      </div>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-500 text-sm">
        Log Explorer coming in US-03 — search, filter, and virtualised table.
      </div>
    </div>
  );
}
