'use client';

import { useRef, lazy, Suspense } from 'react';
import type { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { useDeviceTier } from '@/lib/providers/DeviceTierProvider';
import { cn } from '@/lib/utils/cn';

const LazyCanvas = lazy(() =>
  import('@react-three/fiber').then((mod) => ({ default: mod.Canvas })),
);

function FloatingGeometry() {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (mesh) {
      mesh.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.3;
      mesh.rotation.y = Math.sin(clock.elapsedTime * 0.2) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.5}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#3b82f6" wireframe />
    </mesh>
  );
}

export function Scene404() {
  const reduced = useReducedMotion();
  const { tier } = useDeviceTier();

  if (reduced) return null;

  const dpr: [number, number] = tier === 'low' ? [1, 1] : [1, 1.5];

  return (
    <div className={cn('absolute inset-0')} aria-hidden="true">
      <Suspense fallback={null}>
        <LazyCanvas
          camera={{ position: [0, 0, 4] }}
          gl={{ antialias: false, alpha: true }}
          dpr={dpr}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <FloatingGeometry />
        </LazyCanvas>
      </Suspense>
    </div>
  );
}
