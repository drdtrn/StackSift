import Link from 'next/link';
import { AuthGuard } from '@/app/components/providers/AuthGuard';

/**
 * Dashboard group layout — persistent navigation shell.
 *
 * FE-05 STUB: Uses a minimal hardcoded sidebar with Next.js <Link> components.
 * No useUIStore import — that Zustand store is being built in FE-06 (a
 * separate branch). Adding a store import here would create a merge conflict.
 *
 * Once FE-06 merges:
 *   - Replace static sidebar with <AppShell> (collapsible, useUIStore-aware)
 *   - Add <Topbar> (org switcher, notification bell, user avatar)
 *   - Add mobile drawer with hamburger toggle
 *
 * The sidebar links map to every dashboard route. The layout is Server
 * Component — no interactivity needed at this stub level.
 */

const NAV_LINKS = [
  { href: '/', label: 'Overview', icon: '⬛' },
  { href: '/logs', label: 'Logs', icon: '📋' },
  { href: '/incidents', label: 'Incidents', icon: '🔥' },
  { href: '/alerts', label: 'Alerts', icon: '🔔' },
  { href: '/projects', label: 'Projects', icon: '📁' },
  { href: '/settings', label: 'Settings', icon: '⚙️' },
] as const;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen">
      {/* Sidebar stub — replaced by <AppShell> after FE-06 merges */}
      <aside
        className="w-56 shrink-0 border-r border-zinc-800 bg-zinc-950 flex flex-col gap-1 px-2 py-4"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div className="px-3 pb-4 mb-2 border-b border-zinc-800">
          <span className="font-semibold text-sm tracking-wide">StackSift</span>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-0.5">
          {NAV_LINKS.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
            >
              <span aria-hidden="true">{icon}</span>
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </AuthGuard>
  );
}
