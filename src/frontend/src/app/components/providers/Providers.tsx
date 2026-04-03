'use client';

/**
 * Providers — client-side context wrapper for the entire app.
 *
 * Current state (FE-05 stub): passes children through untouched.
 *
 * Pending additions:
 *   - FE-07: wrap with <QueryClientProvider> (TanStack Query)
 *   - FE-06: wrap with theme provider once useUIStore is available
 *
 * Placed here so root layout.tsx stays a Server Component — only
 * this file carries the 'use client' boundary.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
