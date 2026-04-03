'use client';

/**
 * Dashboard error boundary.
 *
 * Next.js 16: `unstable_retry` replaces the old `reset()` prop. It re-fetches
 * server data and re-renders the entire boundary — more reliable than reset()
 * which only cleared client state.
 *
 * Scoped to the (dashboard) route group — the root error.tsx handles errors
 * that occur in layouts above this level (e.g. in Providers).
 */
export default function DashboardError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="text-4xl">⚠️</p>
      <h2 className="text-xl font-semibold">Failed to load dashboard</h2>
      <p className="text-sm text-zinc-400 max-w-sm">
        {error.message || 'An unexpected error occurred.'}
      </p>
      {error.digest && (
        <p className="font-mono text-xs text-zinc-500">ID: {error.digest}</p>
      )}
      <button
        onClick={unstable_retry}
        className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
      >
        Retry
      </button>
    </div>
  );
}
