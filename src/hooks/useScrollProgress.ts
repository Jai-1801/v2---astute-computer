import { useState, useEffect, useCallback, useRef } from 'react';

interface ScrollProgress {
  progress: number;
  scrollY: number;
  direction: 'up' | 'down' | null;
}

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState<ScrollProgress>({
    progress: 0,
    scrollY: 0,
    direction: null,
  });

  const lastScrollY = useRef(0);
  const animationFrameRef = useRef<number>();

  const updateScrollProgress = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;
      const direction = scrollY > lastScrollY.current ? 'down' : scrollY < lastScrollY.current ? 'up' : null;

      lastScrollY.current = scrollY;

      setScrollProgress({
        progress,
        scrollY,
        direction,
      });
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateScrollProgress]);

  return scrollProgress;
}
