// PERFORMANCE: CustomCursor disabled to reduce RAF loops
// With FloatingGrid, LightPillar, and DotGrid already running animations,
// the custom cursor was adding too much overhead

export function CustomCursor() {
  // Return null - use native cursor for best performance
  return null;
}
