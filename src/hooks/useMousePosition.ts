import { useRef, useEffect, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

// Default values
const defaultPosition: MousePosition = {
  x: 0,
  y: 0,
  normalizedX: 0,
  normalizedY: 0,
};

// Global mouse position - shared across all consumers to avoid multiple listeners
let globalMousePosition: MousePosition = { ...defaultPosition };
let listenerCount = 0;

function updateGlobalMousePosition(e: MouseEvent) {
  globalMousePosition = {
    x: e.clientX,
    y: e.clientY,
    normalizedX: (e.clientX / window.innerWidth) * 2 - 1,
    normalizedY: (e.clientY / window.innerHeight) * 2 - 1,
  };
}

/**
 * Optimized mouse position hook that uses a shared global listener
 * instead of creating multiple listeners per component.
 * 
 * Returns a ref-based getter function to avoid re-renders on mouse move.
 */
export function useMousePosition() {
  const positionRef = useRef<MousePosition>(globalMousePosition);

  useEffect(() => {
    listenerCount++;

    // Only add listener if this is the first consumer
    if (listenerCount === 1) {
      window.addEventListener('mousemove', updateGlobalMousePosition, { passive: true });
    }

    // Update ref on each animation frame (for consumers that need it)
    let rafId: number;
    const updateRef = () => {
      positionRef.current = globalMousePosition;
      rafId = requestAnimationFrame(updateRef);
    };
    rafId = requestAnimationFrame(updateRef);

    return () => {
      listenerCount--;
      cancelAnimationFrame(rafId);

      // Remove listener when last consumer unmounts
      if (listenerCount === 0) {
        window.removeEventListener('mousemove', updateGlobalMousePosition);
        globalMousePosition = { ...defaultPosition };
      }
    };
  }, []);

  // Return ref for non-reactive access (no re-renders)
  // Components using useFrame or similar can read positionRef.current directly
  return positionRef.current;
}

/**
 * For components that need reactive updates (will cause re-renders).
 * Use sparingly - prefer useMousePosition for most use cases.
 */
export function useMousePositionReactive(throttleMs = 32) {
  const [position, setPosition] = useReactiveState<MousePosition>(defaultPosition);
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastUpdateRef.current < throttleMs) return;

      lastUpdateRef.current = now;
      setPosition({
        x: e.clientX,
        y: e.clientY,
        normalizedX: (e.clientX / window.innerWidth) * 2 - 1,
        normalizedY: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [throttleMs, setPosition]);

  return position;
}

// Simple useState wrapper for the reactive version
function useReactiveState<T>(initial: T): [T, (value: T) => void] {
  const { useState } = require('react');
  return useState(initial);
}
