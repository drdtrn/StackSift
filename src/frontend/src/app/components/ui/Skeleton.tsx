'use client';

import { motion } from 'framer-motion';
import { cn } from '@/app/lib/utils';

export type SkeletonShape = 'line' | 'circle' | 'rectangle';

export interface SkeletonProps {
  /**
   * `line`      — full-width bar at fixed height (default 16px). Use for text placeholders.
   * `circle`    — square aspect ratio rounded to full circle. Use for avatars / icons.
   * `rectangle` — explicit width × height block. Use for images / chart placeholders.
   */
  shape?: SkeletonShape;
  /** Explicit width. Accepts any CSS length string (e.g. '120px', '50%'). */
  width?: string;
  /** Explicit height. Defaults: line → 16px, circle → 40px, rectangle → 80px. */
  height?: string;
  className?: string;
}

const shapeDefaults: Record<SkeletonShape, { height: string; classes: string }> = {
  line:      { height: '16px', classes: 'w-full rounded-md' },
  circle:    { height: '40px', classes: 'rounded-full' },
  rectangle: { height: '80px', classes: 'w-full rounded-md' },
};

/**
 * Animated placeholder shown while content is loading.
 *
 * Uses Framer Motion's `animate` prop for a smooth opacity pulse rather than
 * a CSS `@keyframes` animation. This satisfies FE-12 (Framer Motion integration)
 * and gives us programmatic control over the pulse timing if we need to
 * synchronise multiple skeletons.
 *
 * The `aria-hidden` attribute prevents screen readers from announcing the
 * skeleton — they should be used alongside real content containers that carry
 * `aria-busy="true"` on the parent.
 */
export function Skeleton({
  shape = 'line',
  width,
  height,
  className,
}: SkeletonProps) {
  const defaults = shapeDefaults[shape];
  const resolvedHeight = height ?? defaults.height;
  const resolvedWidth = shape === 'circle' ? (width ?? resolvedHeight) : width;

  return (
    <motion.span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: resolvedWidth,
        height: resolvedHeight,
      }}
      className={cn(
        'bg-zinc-200 dark:bg-zinc-800',
        defaults.classes,
        className,
      )}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}
