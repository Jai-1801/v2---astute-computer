import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll - ultra fast but smooth
    const lenis = new Lenis({
      duration: 0.3, // Ultra fast scroll duration
      easing: (t) => 1 - Math.pow(1 - t, 2), // Quadratic ease-out for snappy feel
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.2,
      wheelMultiplier: 1.5, // Even faster wheel response
    });

    lenisRef.current = lenis;

    // RAF loop for Lenis
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
