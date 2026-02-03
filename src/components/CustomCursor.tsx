import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

export function CustomCursor() {
  const isMobile = useIsMobile();
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for cursor following
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Slightly slower ring for trailing effect
  const ringSpringConfig = { damping: 20, stiffness: 200, mass: 0.8 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer') ||
        getComputedStyle(target).cursor === 'pointer';

      if (isInteractive) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer') ||
        getComputedStyle(target).cursor === 'pointer';

      if (isInteractive) {
        setIsHovering(false);
      }
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
    };
  }, [isMobile, mouseX, mouseY, isVisible]);

  // Don't render on mobile or touch devices
  if (isMobile) return null;

  return (
    <>
      {/* Hide default cursor globally */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isClicking ? 0.5 : isHovering ? 0.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          className="w-2 h-2 -ml-1 -mt-1 rounded-full bg-foreground"
          style={{
            boxShadow: isHovering
              ? '0 0 20px hsl(var(--foreground) / 0.8), 0 0 40px hsl(var(--foreground) / 0.4)'
              : '0 0 10px hsl(var(--foreground) / 0.3)',
          }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          opacity: isVisible ? (isHovering ? 1 : 0.6) : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="w-8 h-8 -ml-4 -mt-4 rounded-full border border-foreground/50"
          style={{
            boxShadow: isHovering
              ? '0 0 30px hsl(var(--foreground) / 0.3), inset 0 0 20px hsl(var(--foreground) / 0.1)'
              : 'none',
            backgroundColor: isHovering ? 'hsl(var(--foreground) / 0.05)' : 'transparent',
          }}
        />
      </motion.div>

      {/* Glow effect on hover */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9997]"
          style={{
            x: ringX,
            y: ringY,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="w-16 h-16 -ml-8 -mt-8 rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(var(--foreground) / 0.2) 0%, transparent 70%)',
            }}
          />
        </motion.div>
      )}
    </>
  );
}
