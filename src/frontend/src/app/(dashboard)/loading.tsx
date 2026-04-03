import { Skeleton } from '@/app/components/ui/Skeleton';

/**
 * Dashboard loading state — shown while the overview page fetches data.
 *
 * Next.js renders this file automatically during navigation or data loading.
 * It mirrors the structure of page.tsx so the layout shift is minimal when
 * real content replaces the skeletons.
 *
 * Uses the <Skeleton> component from FE-03 — no new UI code needed here.
 */
export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-7 w-36" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Metric card skeletons */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-lg" />
        ))}
      </div>

      {/* Incidents table skeleton */}
      <Skeleton className="h-48 rounded-lg" />
    </div>
  );
}
