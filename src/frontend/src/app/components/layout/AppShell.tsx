'use client';

import { motion } from 'framer-motion';
import { useUIStore } from '@/app/hooks/useUIStore';
import { Sidebar } from './Sidebar';
import { MobileTopBar } from './MobileTopBar';
import { MobileDrawer } from './MobileDrawer';

// ---------------------------------------------------------------------------
// AppShell
//
// The 'use client' orchestrator for the entire dashboard chrome. It reads
// UIStore state and renders the correct layout for desktop vs mobile:
//
//   Desktop (≥ 768px):
//     ┌──────────────────────────────────────────────────┐
//     │ [Sidebar w-56 or w-16] │ [main flex-1 children] │
//     └──────────────────────────────────────────────────┘
//     The sidebar width is animated via Framer Motion so the main content
//     area grows/shrinks smoothly without a layout jump.
//
//   Mobile (< 768px):
//     ┌────────────────────────────────┐
//     │ [MobileTopBar ── hamburger]    │
//     ├────────────────────────────────┤
//     │ [main flex-1 children]         │
//     └────────────────────────────────┘
//     The MobileDrawer overlays the content when the hamburger is clicked.
//
// Why layout.tsx stays Server Component:
//   layout.tsx exports `metadata` (title template for the dashboard group).
//   Only Server Components can export metadata. AppShell is the single
//   client boundary — layout delegates everything interactive here.
//
// Framer Motion strategy for desktop sidebar:
//   `motion.div` wraps the Sidebar with `animate={{ width }}`.
//   Width 224px = w-56, 64px = w-16.
//   `overflow: hidden` on the wrapper clips labels during the shrink animation.
//   The main content `flex-1` fills the remaining space automatically,
//   producing the smooth "push" effect without explicit width math.
// ---------------------------------------------------------------------------

const SIDEBAR_EXPANDED_WIDTH = 224; // px — matches Tailwind w-56
const SIDEBAR_COLLAPSED_WIDTH = 64; // px — matches Tailwind w-16

export function AppShell({ children }: { children: React.ReactNode }) {
  const {
    sidebarCollapsed,
    mobileDrawerOpen,
    toggleSidebar,
    setMobileDrawerOpen,
  } = useUIStore();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Mobile top bar — hidden on md+ via MobileTopBar's own md:hidden class */}
      <MobileTopBar />

      {/* Mobile drawer overlay */}
      <MobileDrawer
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
      />

      {/* Body row: desktop sidebar + main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar — hidden on mobile via hidden md:block */}
        <motion.div
          className="hidden md:flex shrink-0 overflow-hidden"
          animate={{ width: sidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          style={{ minHeight: 0 }}
        >
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggle={toggleSidebar}
            isMobile={false}
          />
        </motion.div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
