// PERFORMANCE FIX: Disabled Lenis smooth scroll entirely
// Having multiple RAF loops (Lenis + LightPillar + CustomCursor + FloatingGrid + DotGrid)
// was causing severe performance issues. Native scroll is now used.

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  // Just render children - no smooth scroll library
  // Native browser scroll is the most performant option
  return <>{children}</>;
}
