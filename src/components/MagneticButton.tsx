import React, { useRef, useState, useCallback, forwardRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  href?: string;
}

export const MagneticButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, MagneticButtonProps>(
  function MagneticButton({
    children,
    className,
    variant = 'primary',
    onClick,
    href,
  }, forwardedRef) {
  const internalRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const ref = (forwardedRef as React.RefObject<HTMLButtonElement | HTMLAnchorElement>) || internalRef;
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      x.set(distanceX * 0.3);
      y.set(distanceY * 0.3);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  const baseStyles = cn(
    'relative inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-wide uppercase transition-all duration-300 rounded-full overflow-hidden',
    variant === 'primary' &&
      'bg-foreground text-background button-glow hover:scale-105',
    variant === 'secondary' &&
      'bg-transparent border-2 border-foreground/30 text-foreground hover:border-foreground hover:bg-foreground/5',
    className
  );

  const Component = href ? motion.a : motion.button;
  const props = href ? { href } : { onClick };

  return (
    <Component
      ref={ref as any}
      className={baseStyles}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-muted-foreground/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? '100%' : '-100%' }}
          transition={{ duration: 0.5 }}
        />
      )}
    </Component>
  );
});
