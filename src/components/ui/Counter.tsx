import { useRef, useEffect, useState } from 'react';

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}

// PERFORMANCE FIX: Replaced framer-motion spring with pure JS animation
// This eliminates the spring library overhead and subscription callbacks
export function Counter({
  value,
  suffix = '',
  prefix = '',
  className = '',
  duration = 1.5, // Reduced default duration
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateValue(ref.current!, 0, value, duration * 1000);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated, value, duration]);

  // Pure JS eased animation - no library overhead
  function animateValue(element: HTMLSpanElement, start: number, end: number, durationMs: number) {
    const startTime = performance.now();

    function update(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Ease out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);

      const formatted = current >= 1000
        ? `${(current / 1000).toFixed(1)}K`
        : current.toString();
      element.textContent = `${prefix}${formatted}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
