import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'New Project | StackSift' };

/**
 * New project wizard — maps to URL: /projects/new
 *
 * Final implementation (US-07): three-step React Hook Form wizard:
 *   Step 1 — project name + description
 *   Step 2 — choose log source type (SDK / syslog agent / webhook / file)
 *   Step 3 — generated API key + SDK integration snippet
 */
export default function NewProjectPage() {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold">New Project</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Connect a service to start ingesting logs.
        </p>
      </div>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-500 text-sm">
        Project creation wizard (multi-step form) coming in US-07.
      </div>
    </div>
  );
}
