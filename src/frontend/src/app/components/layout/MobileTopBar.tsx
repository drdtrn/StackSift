'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useUIStore } from '@/app/hooks/useUIStore';

// ---------------------------------------------------------------------------
// MobileTopBar
//
// A narrow top bar shown only on mobile viewports (below md: 768px).
// Contains:
//   - Hamburger button to open the mobile sidebar drawer
//   - StackSift wordmark linking to /
//
// Hidden on tablet and desktop via Tailwind `md:hidden`.
// Rendered as part of AppShell at the top of the page on mobile.
// ---------------------------------------------------------------------------

export function MobileTopBar() {
  const { toggleMobileDrawer } = useUIStore();

  return (
    <header
      className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-zinc-800 bg-zinc-950 shrink-0"
      aria-label="Mobile navigation bar"
    >
      <button
        type="button"
        onClick={toggleMobileDrawer}
        aria-label="Open navigation menu"
        className="rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      <Link
        href="/"
        className="font-semibold text-sm tracking-wide text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
        aria-label="StackSift home"
      >
        StackSift
      </Link>
    </header>
  );
}
