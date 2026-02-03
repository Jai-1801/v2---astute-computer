import { useRef, useMemo, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';

function GridLines() {
  const ref = useRef<THREE.Group>(null);
  const { normalizedX, normalizedY } = useMousePosition();

  const linesMesh = useMemo(() => {
    const gridSize = 20;
    const spacing = 2;
    const offset = (gridSize * spacing) / 2;
    
    const positions: number[] = [];
    
    // Horizontal lines
    for (let i = 0; i <= gridSize; i++) {
      const y = i * spacing - offset;
      positions.push(-offset, y, 0, offset, y, 0);
    }

    // Vertical lines
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
      // Smooth parallax effect
      ref.current.rotation.x = THREE.MathUtils.lerp(
        ref.current.rotation.x,
        normalizedY * 0.1 + Math.sin(clock.elapsedTime * 0.1) * 0.02,
        0.05
      );
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        normalizedX * 0.1 + Math.cos(clock.elapsedTime * 0.1) * 0.02,
        0.05
      );
    }
  });

  return (
    <group ref={ref} rotation={[0.5, 0, 0]} position={[0, 0, -15]}>
      <lineSegments geometry={linesMesh}>
        <lineBasicMaterial color="#333333" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

function FloatingParticles() {
  const count = 50;
  const ref = useRef<THREE.Points>(null);
  const { normalizedX, normalizedY } = useMousePosition();

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10;
      siz[i] = Math.random() * 2 + 0.5;
    }

    return [pos, siz];
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.02 + normalizedX * 0.1;
      ref.current.rotation.x = normalizedY * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.05}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingCubes() {
  const { normalizedX, normalizedY } = useMousePosition();

  return (
    <group>
      {[...Array(5)].map((_, i) => (
        <Float
          key={i}
          speed={1 + i * 0.2}
          rotationIntensity={0.5}
          floatIntensity={0.5}
        >
          <mesh
            position={[
              (i - 2) * 8 + normalizedX * 2,
              Math.sin(i * 1.5) * 5 + normalizedY * 2,
              -15 - i * 3,
            ]}
            rotation={[i * 0.5, i * 0.3, 0]}
          >
            <boxGeometry args={[1 + i * 0.3, 1 + i * 0.3, 1 + i * 0.3]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.03 + i * 0.01}
              wireframe
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <GridLines />
      <FloatingParticles />
      <FloatingCubes />
    </>
  );
}

export function FloatingGrid() {
  const [contextLost, setContextLost] = useState(false);
  
  const handleCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    const canvas = gl.domElement;
    
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setContextLost(true);
    };
    
    const handleContextRestored = () => {
      setContextLost(false);
    };
    
    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);
    
    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, []);
  
  return (
    <div className="absolute inset-0 z-0">
      {!contextLost && (
        <Canvas
          key={contextLost ? 'lost' : 'active'}
          camera={{ position: [0, 0, 20], fov: 60 }}
          dpr={[1, 2]}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: 'high-performance'
          }}
          onCreated={handleCreated}
        >
          <Scene />
        </Canvas>
      )}
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
    </div>
  );
}
