import React, { useRef, useState, useCallback, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  href?: string;
  showArrow?: boolean;
}

export const MagneticButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, MagneticButtonProps>(
  function MagneticButton({
    children,
    className,
    variant = 'primary',
    onClick,
    href,
    showArrow = false,
  }, forwardedRef) {
    const internalRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    const ref = (forwardedRef as React.RefObject<HTMLButtonElement | HTMLAnchorElement>) || internalRef;
    const [isHovered, setIsHovered] = useState(false);

    // Simplified magnetic effect using CSS transform instead of framer-motion springs
    // This is much more performant as it doesn't require React state updates on every mouse move
    const handleMouseMove = useCallback(
      (e: React.MouseEvent) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = (e.clientX - centerX) * 0.2;
        const distanceY = (e.clientY - centerY) * 0.2;

        ref.current.style.transform = `translate(${distanceX}px, ${distanceY}px)`;
      },
      []
    );

    const handleMouseLeave = useCallback(() => {
      if (ref.current) {
        ref.current.style.transform = 'translate(0, 0)';
      }
      setIsHovered(false);
    }, []);

    const baseStyles = cn(
      'relative inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium tracking-wide uppercase transition-all duration-300 rounded-full overflow-hidden',
      variant === 'primary' &&
      'bg-primary text-primary-foreground button-glow hover:scale-105',
      variant === 'secondary' &&
      'bg-transparent border-2 border-border text-foreground hover:border-primary/50 hover:bg-primary/5',
      className
    );

    const Component = href ? 'a' : 'button';
    const props = href ? { href } : { onClick };

    return (
      <Component
        ref={ref as any}
        className={baseStyles}
        style={{ transition: 'transform 0.2s ease-out, box-shadow 0.3s ease, background-color 0.3s ease' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {showArrow && (
            <motion.span
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="h-4 w-4" />
            </motion.span>
          )}
        </span>
        {variant === 'primary' && isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary-foreground/10 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 0.5 }}
          />
        )}
      </Component>
    );
  });
