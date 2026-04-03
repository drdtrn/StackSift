import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | StackSift',
};

/**
 * Dashboard overview page — maps to URL: /
 *
 * Final implementation (US-01 / US-02): will show:
 *   - Active alert count by severity
 *   - Recent incidents with status
 *   - Log ingestion rate sparkline
 *   - Connected projects count
 *
 * Data will come from TanStack Query hooks (useProjects, useAlerts,
 * useIncidents) once FE-07 wires up the Axios + QueryClient layer.
 */
export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Overview</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Active alerts, recent incidents, and ingestion stats.
        </p>
      </div>

      {/* Placeholder metric cards — replaced with live data in US-01 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {['Active Alerts', 'Open Incidents', 'Projects', 'Logs / min'].map((label) => (
          <div
            key={label}
            className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 flex flex-col gap-2"
          >
            <p className="text-xs text-zinc-500 uppercase tracking-wider">{label}</p>
            <div className="h-7 w-16 rounded bg-zinc-800 animate-pulse" />
          </div>
        ))}
      </div>

      {/* Placeholder recent incidents table — replaced in US-02 */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
        <p className="text-sm font-medium mb-3">Recent Incidents</p>
        <div className="flex flex-col gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-10 rounded bg-zinc-800 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
