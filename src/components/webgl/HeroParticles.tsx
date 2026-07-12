'use client';

import { useRef, useMemo, useEffect, lazy, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { useDeviceTier } from '@/lib/providers/DeviceTierProvider';
import {
  vertexShader,
  fragmentShader,
} from '@/components/webgl/shaders/shaders';

const PARTICLE_COUNT_HIGH = 3000;
const PARTICLE_COUNT_MEDIUM = 1200;
const PARTICLE_COUNT_LOW = 400;

function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();
  const { tier, isTouch } = useDeviceTier();
  const count = useMemo(
    () =>
      ({
        low: PARTICLE_COUNT_LOW,
        medium: PARTICLE_COUNT_MEDIUM,
        high: PARTICLE_COUNT_HIGH,
      })[tier],
    [tier],
  );

  const { positions, randoms, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const rnd = new Float32Array(count);
    const siz = new Float32Array(count);
    const spread = 15;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * spread * viewport.aspect;
      pos[i3 + 1] = (Math.random() - 0.5) * spread;
      pos[i3 + 2] = (Math.random() - 0.5) * 10 - 5;
      rnd[i] = Math.random() * 2 - 1;
      siz[i] = Math.random() * 60 + 20;
    }
    return { positions: pos, randoms: rnd, sizes: siz };
  }, [count, viewport.aspect]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, randoms, sizes]);

  useEffect(() => {
    if (isTouch) return;
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [isTouch]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    if (mat.uniforms?.uTime) {
      mat.uniforms.uTime.value = clock.elapsedTime;
    }
    if (mat.uniforms?.uMouseInfluence) {
      mat.uniforms.uMouseInfluence.value = isTouch
        ? 0
        : Math.max(0, 1 - Math.abs(mouseRef.current.y) * 0.5);
    }
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#3b82f6') },
      uColor2: { value: new THREE.Color('#60a5fa') },
      uOpacity: { value: 0.8 },
      uAmplitude: { value: tier === 'low' ? 0.1 : 0.3 },
      uMouseInfluence: { value: 0 },
    }),
    [tier],
  );

  return (
    <points ref={meshRef} geometry={geometry}>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function SceneBackground() {
  return <color attach="background" args={['#0a0a0f']} />;
}

export function HeroParticles() {
  const reduced = useReducedMotion();
  const { tier } = useDeviceTier();

  if (reduced || tier === 'low') {
    return (
      <div
        className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-bg"
        aria-hidden="true"
      />
    );
  }

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        className="absolute inset-0"
      >
        <SceneBackground />
        <ParticleField />
      </Canvas>
    </div>
  );
}

export default HeroParticles;
