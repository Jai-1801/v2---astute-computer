import { useRef, useEffect, useState } from 'react';
import { useMotionValue, useSpring, motion } from 'framer-motion';

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}

export function Counter({
  value,
  suffix = '',
  prefix = '',
  className = '',
  duration = 2,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
    duration: duration * 1000,
  });

  // Custom intersection observer that works reliably on mobile
  useEffect(() => {
    if (!ref.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            motionValue.set(value);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px' // No negative margin - triggers as soon as visible
      }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        const formatted = latest >= 1000 
          ? `${(latest / 1000).toFixed(1)}K`
          : latest.toFixed(0);
        ref.current.textContent = `${prefix}${formatted}${suffix}`;
      }
    });
    return unsubscribe;
  }, [springValue, suffix, prefix]);

  return (
    <motion.span 
      ref={ref} 
      className={className}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      {prefix}0{suffix}
    </motion.span>
  );
}
