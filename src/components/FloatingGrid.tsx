import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { usePerformance } from '@/hooks/usePerformance';

// Shared mouse position ref
const sharedMouseRef = { normalizedX: 0, normalizedY: 0 };

function GridLines() {
  const ref = useRef<THREE.Group>(null);

  const linesMesh = useMemo(() => {
    const gridSize = 15; // Reduced from 20
    const spacing = 2;
    const offset = (gridSize * spacing) / 2;
    const positions: number[] = [];

    for (let i = 0; i <= gridSize; i++) {
      const y = i * spacing - offset;
      positions.push(-offset, y, 0, offset, y, 0);
    }
    for (let i = 0; i <= gridSize; i++) {
      const x = i * spacing - offset;
      positions.push(x, -offset, 0, x, offset, 0);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, sharedMouseRef.normalizedY * 0.05, 0.03);
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, sharedMouseRef.normalizedX * 0.05, 0.03);
    }
  });

  return (
    <group ref={ref} rotation={[0.5, 0, 0]} position={[0, 0, -15]}>
      <lineSegments geometry={linesMesh}>
        <lineBasicMaterial color="#333333" transparent opacity={0.2} />
      </lineSegments>
    </group>
  );
}

function FloatingParticles() {
  const count = 15; // Reduced from 25
  const ref = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 10;
      siz[i] = Math.random() * 1.5 + 0.5;
    }
    return [pos, siz];
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.04} transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <GridLines />
      <FloatingParticles />
    </>
  );
}

export function FloatingGrid() {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isLagging, reducedMotion } = usePerformance();

  const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isMobile || isLagging) return;
    const handleMouseMove = (e: MouseEvent) => {
      sharedMouseRef.normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      sharedMouseRef.normalizedY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, isLagging]);

  // Don't render 3D on mobile, when lagging, or when user prefers reduced motion
  if (isMobile || isLagging || reducedMotion) {
    return (
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none">
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 20], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
          frameloop={isVisible ? 'always' : 'never'}
          style={{ pointerEvents: 'none' }}
        >
          <Scene />
        </Canvas>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
    </div>
  );
}
