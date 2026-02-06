import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

// PERFORMANCE FIX: Removed blur filter animation - filters are expensive
// Now just animates opacity and transform (GPU accelerated)
export function BlurFade({
  children,
  className = '',
  delay = 0,
  duration = 0.3, // Reduced from 0.4
  yOffset = 8, // Reduced from 12
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' }); // Reduced margin

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      // Removed blur filter - causes layout recalculation
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
}
