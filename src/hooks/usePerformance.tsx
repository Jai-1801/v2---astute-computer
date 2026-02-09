import { useEffect, useRef, useState, createContext, useContext } from 'react';

interface PerformanceState {
    isLagging: boolean;
    fps: number;
    reducedMotion: boolean;
}

const PerformanceContext = createContext<PerformanceState>({
    isLagging: false,
    fps: 60,
    reducedMotion: false,
});

export function usePerformance() {
    return useContext(PerformanceContext);
}

// PERFORMANCE MONITOR: Detects lag and disables animations when FPS drops
export function PerformanceProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<PerformanceState>({
        isLagging: false,
        fps: 60,
        reducedMotion: false,
    });

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            setState(s => ({ ...s, reducedMotion: true, isLagging: true }));
            return;
        }

        // FPS monitoring
        let frameCount = 0;
        let lastTime = performance.now();
        let lowFpsCount = 0;
        let rafId: number;

        const measureFPS = () => {
            frameCount++;
            const now = performance.now();
            const elapsed = now - lastTime;

            // Calculate FPS every 500ms
            if (elapsed >= 500) {
                const fps = Math.round((frameCount * 1000) / elapsed);
                frameCount = 0;
                lastTime = now;

                // Track consecutive low FPS frames (less aggressive threshold)
                if (fps < 30) {
                    lowFpsCount++;
                } else {
                    lowFpsCount = Math.max(0, lowFpsCount - 2); // Recover faster
                }

                // Mark as lagging if FPS drops below threshold for 5 consecutive checks (~2.5s of sustained lag)
                const isLagging = lowFpsCount >= 5;

                setState(s => {
                    if (s.fps !== fps || s.isLagging !== isLagging) {
                        return { ...s, fps, isLagging };
                    }
                    return s;
                });
            }

            rafId = requestAnimationFrame(measureFPS);
        };

        rafId = requestAnimationFrame(measureFPS);

        return () => cancelAnimationFrame(rafId);
    }, []);

    return (
        <PerformanceContext.Provider value={state}>
            {children}
        </PerformanceContext.Provider>
    );
}
