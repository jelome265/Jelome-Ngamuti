# Phase 1: Hero & Motion Background (Days 4–7)

**Goal:** First impression with immersive WebGL background, typing animation, CTA cluster. **Zero `style={}` inline CSS — all styling via Tailwind classes, external CSS, or DOM ref mutations.**

**Dependencies:** Phase 0 (layout, providers, UI primitives, globals.css tokens)

---

## File Tree

```
src/
├── app/
│   └── page.tsx                          # Updated — Hero section wired in
├── components/
│   ├── sections/
│   │   └── Hero.tsx                      # Main hero composition
│   ├── webgl/
│   │   ├── HeroParticles.tsx             # Three.js particle scene
│   │   ├── shaders/
│   │   │   ├── vertex.glsl
│   │   │   ├── fragment.glsl
│   │   │   └── fbm-noise.glsl
│   │   └── useDeviceTier.ts             # Re-export
│   └── animation/
│       ├── TextScramble.tsx              # Split-text scramble reveal
│       ├── MagneticButton.tsx            # CTA cursor magnetic effect (DOM ref)
│       └── TypingAnimation.tsx           # Terminal-style typewriter
├── lib/
│   ├── hooks/
│   │   └── useDeviceTier.ts             # Re-export
│   └── providers/
│       └── DeviceTierProvider.tsx        # Context for WebGL quality
└── public/
    └── images/
        ├── avatar.webp
        └── hero-bg-fallback.webp
```

---

## Task 1.1 — Device Tier Provider

### src/lib/providers/DeviceTierProvider.tsx

```typescript
'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type DeviceTier = 'low' | 'medium' | 'high';

interface DeviceTierContextValue {
  tier: DeviceTier;
  dpr: number;
  particleMultiplier: number;
  enablePostProcessing: boolean;
  isTouch: boolean;
}

const DeviceTierContext = createContext<DeviceTierContextValue | null>(null);

function detectTier(): DeviceTier {
  if (typeof window === 'undefined') return 'high';
  const memory = (navigator as any).deviceMemory;
  if (memory && memory <= 2) return 'low';
  const cores = navigator.hardwareConcurrency;
  if (cores && cores <= 4) return 'low';
  if (cores && cores <= 6) return 'medium';
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  if (!gl) return 'low';
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  const renderer = debugInfo ? (gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string) : '';
  const lowPatterns = ['intel hd graphics', 'intel uhd graphics 6', 'adreno 5', 'adreno 6', 'mali-400', 'mali-450', 'powervr'];
  for (const p of lowPatterns) { if (renderer.toLowerCase().includes(p)) return 'low'; }
  return 'high';
}

export function DeviceTierProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DeviceTierContextValue>({ tier: 'high', dpr: 1, particleMultiplier: 1, enablePostProcessing: true, isTouch: false });

  useEffect(() => {
    const tier = detectTier();
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    let dpr: number, particleMultiplier: number, enablePostProcessing: boolean;
    switch (tier) {
      case 'low': dpr = Math.min(window.devicePixelRatio, 1); particleMultiplier = 0.3; enablePostProcessing = false; break;
      case 'medium': dpr = Math.min(window.devicePixelRatio, 1.5); particleMultiplier = 0.6; enablePostProcessing = false; break;
      case 'high': dpr = Math.min(window.devicePixelRatio, 2); particleMultiplier = 1; enablePostProcessing = true; break;
    }
    if (isTouch) { particleMultiplier *= 0.5; dpr = Math.min(dpr, 1.5); }
    setState({ tier, dpr, particleMultiplier, enablePostProcessing, isTouch });
  }, []);

  return <DeviceTierContext.Provider value={state}>{children}</DeviceTierContext.Provider>;
}

export function useDeviceTier(): DeviceTierContextValue {
  const ctx = useContext(DeviceTierContext);
  if (!ctx) throw new Error('useDeviceTier must be used within DeviceTierProvider');
  return ctx;
}
```

### src/components/webgl/useDeviceTier.ts
```typescript
export { useDeviceTier } from '@/lib/providers/DeviceTierProvider';
```

---

## Task 1.2 — GLSL Shaders

### src/components/webgl/shaders/vertex.glsl
```glsl
uniform float uTime;
uniform float uAmplitude;
attribute float aRandom;
attribute float aSize;
varying float vAlpha;
varying vec2 vUv;
void main() {
  vec3 pos = position;
  float floatX = sin(uTime * 0.5 + aRandom * 10.0) * uAmplitude * aRandom;
  float floatY = cos(uTime * 0.3 + aRandom * 15.0) * uAmplitude * aRandom;
  float floatZ = sin(uTime * 0.4 + aRandom * 20.0) * uAmplitude * aRandom * 0.5;
  pos.x += floatX; pos.y += floatY; pos.z += floatZ;
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = aSize * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
  vAlpha = 0.3 + 0.7 * (1.0 - abs(pos.y) * 0.01);
  vUv = uv;
}
```

### src/components/webgl/shaders/fragment.glsl
```glsl
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uOpacity;
uniform float uMouseInfluence;
varying float vAlpha;
void main() {
  vec2 center = gl_PointCoord - vec2(0.5);
  float dist = length(center);
  if (dist > 0.5) discard;
  float alpha = smoothstep(0.5, 0.0, dist) * vAlpha * uOpacity;
  vec3 color = mix(uColor1, uColor2, dist * 2.0);
  color *= 1.0 + uMouseInfluence * 0.3;
  gl_FragColor = vec4(color, alpha);
}
```

### src/components/webgl/shaders/fbm-noise.glsl
```glsl
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * 7.0 * (1.0 / 49.0));
  vec4 x_ = floor(j * 7.0 / 49.0);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.zzzz;
  vec4 t = 1.0 - x*x - y*y;
  return 0.5 + 0.5 * dot(t*t*t * (t * x * x + y * y), vec4(1.0, 0.0, -1.0, 0.5));
}
float fbm(vec3 p, int octaves) {
  float value = 0.0, amplitude = 0.5, frequency = 1.0;
  for (int i = 0; i < 5; i++) { if (i >= octaves) break; value += amplitude * snoise(p * frequency); amplitude *= 0.5; frequency *= 2.0; }
  return value;
}
```

---

## Task 1.3 — HeroParticles (Three.js Scene, No Inline Style)

Uses Three.js Canvas config (not React `style={}`). The outer wrapper uses Tailwind classes.

```typescript
'use client';

import { useRef, useMemo, useEffect, lazy, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { useDeviceTier } from '@/lib/providers/DeviceTierProvider';

const PARTICLE_COUNT_HIGH = 3000;
const PARTICLE_COUNT_MEDIUM = 1200;
const PARTICLE_COUNT_LOW = 400;

function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();
  const { tier, isTouch } = useDeviceTier();
  const count = useMemo(() => ({ low: PARTICLE_COUNT_LOW, medium: PARTICLE_COUNT_MEDIUM, high: PARTICLE_COUNT_HIGH })[tier], [tier]);

  const { positions, randoms, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3), rnd = new Float32Array(count), siz = new Float32Array(count);
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

  useEffect(() => {
    if (isTouch) return;
    const handleMouse = (e: MouseEvent) => { mouseRef.current = { x: (e.clientX / window.innerWidth) * 2 - 1, y: -(e.clientY / window.innerHeight) * 2 + 1 }; };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [isTouch]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = clock.elapsedTime;
    mat.uniforms.uMouseInfluence.value = isTouch ? 0 : Math.max(0, 1 - Math.abs(mouseRef.current.y) * 0.5);
  });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 }, uColor1: { value: new THREE.Color('#3b82f6') }, uColor2: { value: new THREE.Color('#60a5fa') },
    uOpacity: { value: 0.8 }, uAmplitude: { value: tier === 'low' ? 0.1 : 0.3 }, uMouseInfluence: { value: 0 },
  }), [tier]);

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aRandom" count={count} array={randoms} itemSize={1} />
        <bufferAttribute attach="attributes-aSize" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial uniforms={uniforms} vertexShader={require('!!raw-loader!./shaders/vertex.glsl').default} fragmentShader={require('!!raw-loader!./shaders/fragment.glsl').default} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
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
    return <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-bg" aria-hidden="true" />;
  }

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 60 }} gl={{ antialias: false, alpha: false, powerPreference: 'high-performance', stencil: false, depth: true }} className="absolute inset-0">
        <SceneBackground />
        <ParticleField />
      </Canvas>
    </div>
  );
}
```

---

## Task 1.4 — Animation Components (Zero Inline CSS)

### src/components/animation/TextScramble.tsx

No `style={}`. DOM manipulation for textContent updates only.

```typescript
'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { cn } from '@/lib/utils/cn';

interface TextScrambleProps { text: string; as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'; className?: string; duration?: number; delay?: number; once?: boolean; }

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#$%@&';

export function TextScramble({ text, as: Tag = 'h1', className, duration = 1.2, delay = 0, once = true }: TextScrambleProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (reduced) { if (ref.current) ref.current.textContent = text; return; }
    if (once && hasAnimated.current) return;
    const el = ref.current; if (!el) return;
    hasAnimated.current = true;

    const timer = setTimeout(() => {
      const totalFrames = Math.floor(duration * 60);
      let frame = 0;
      function update() {
        const revealCount = Math.floor((frame / totalFrames) * text.length);
        el!.textContent = text.split('').map((c, i) => i < revealCount ? c : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]).join('');
        if (frame++ < totalFrames) requestAnimationFrame(update); else el!.textContent = text;
      }
      requestAnimationFrame(update);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [text, duration, delay, reduced, once]);

  return <Tag ref={ref} className={cn('font-mono', className)} aria-label={text} />;
}
```

### src/components/animation/TypingAnimation.tsx

No `style={}`. Uses Tailwind classes for cursor blink. DOM ref for cursor visibility.

```typescript
'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface Props { text: string; speed?: number; delay?: number; className?: string; showCursor?: boolean; }

export function TypingAnimation({ text, speed = 40, delay = 800, className, showCursor = true }: Props) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) { setDisplayed(text); setStarted(true); return; }
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [text, delay, reduced]);

  useEffect(() => {
    if (!started || reduced) return;
    let i = 0;
    const interval = setInterval(() => { i++; setDisplayed(text.slice(0, i)); if (i >= text.length) clearInterval(interval); }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed, reduced]);

  useEffect(() => {
    if (reduced || !showCursor) return;
    const blink = setInterval(() => {
      if (cursorRef.current) cursorRef.current.style.opacity = cursorRef.current.style.opacity === '0' ? '1' : '0';
    }, 530);
    return () => clearInterval(blink);
  }, [reduced, showCursor]);

  if (reduced) return <p className={className} role="text">{text}</p>;

  return (
    <p className={cn('font-mono', className)} role="text" aria-label={text}>
      <span>{displayed}</span>
      {showCursor && (
        <span ref={cursorRef} className={cn('inline-block w-[2px] h-[1em] bg-primary ml-0.5 align-middle', !started && 'opacity-100')} aria-hidden="true" />
      )}
    </p>
  );
}
```

### src/components/animation/MagneticButton.tsx

No `style={}`. Uses DOM ref + direct `el.style.transform` manipulation for dynamic magnetic offset (this is not React inline CSS, it's imperative DOM mutation).

```typescript
'use client';

import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import { useDeviceTier } from '@/lib/providers/DeviceTierProvider';

interface Props { children: ReactNode; className?: string; as?: 'a' | 'button'; href?: string; onClick?: () => void; ariaLabel?: string; }

export function MagneticButton({ children, className, as: Tag = 'a', href, onClick, ariaLabel }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { isTouch } = useDeviceTier();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch) return;
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const dist = Math.sqrt(x * x + y * y);
    const strength = Math.max(0, 1 - dist / 150);
    el.style.transform = `translate(${x * strength * 0.3}px, ${y * strength * 0.3}px)`;
  };

  const handleMouseLeave = () => { if (ref.current) ref.current.style.transform = ''; };

  const handleClick = () => {
    if (Tag === 'a' && href) {
      if (href.startsWith('#')) document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
      else if (href.startsWith('/')) window.location.href = href;
      else window.open(href, '_blank', 'noopener noreferrer');
    }
    onClick?.();
  };

  return (
    <div ref={ref} className={cn('inline-block transition-transform duration-200 ease-out', className)} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <Tag className="block" href={Tag === 'a' ? href : undefined} onClick={handleClick} aria-label={ariaLabel} role={Tag === 'a' ? undefined : 'button'} tabIndex={0}>
        {children}
      </Tag>
    </div>
  );
}
```

---

## Task 1.5 — Hero Section (Zero Inline CSS)

Uses class-based delays (`hero-delay-1`, `hero-delay-2`, `hero-delay-3` from globals.css) instead of `style={{ animationDelay }}`.

```typescript
'use client';

import { lazy, Suspense } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { TextScramble } from '@/components/animation/TextScramble';
import { TypingAnimation } from '@/components/animation/TypingAnimation';
import { MagneticButton } from '@/components/animation/MagneticButton';
import { siteConfig } from '@/lib/data/site';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { useDeviceTier } from '@/lib/providers/DeviceTierProvider';
import { cn } from '@/lib/utils/cn';

const HeroParticles = lazy(() => import('@/components/webgl/HeroParticles').then(m => ({ default: m.HeroParticles })));

export function Hero() {
  const reduced = useReducedMotion();
  const { tier } = useDeviceTier();
  const showParticles = !reduced && tier !== 'low';

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center overflow-hidden" aria-label="Hero introduction">
      {showParticles ? (
        <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-bg" aria-hidden="true" />}>
          <HeroParticles />
        </Suspense>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-bg" aria-hidden="true" />
      )}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg to-transparent pointer-events-none" aria-hidden="true" />

      <Container className="relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <p className={cn('text-lg text-text-secondary font-medium mb-3', reduced ? '' : 'animate-fade-in hero-delay-1')}>
              Hi, I&apos;m
            </p>
            <TextScramble text={siteConfig.name} as="h1" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary mb-4" duration={1.2} delay={0.3} />
            <TextScramble text={siteConfig.titles.join(' | ')} as="p" className="text-lg sm:text-xl text-primary font-mono mb-6" duration={0.8} delay={0.8} />
            <TypingAnimation text={siteConfig.tagline} className="text-base sm:text-lg text-text-secondary max-w-xl mb-8 leading-relaxed" speed={30} delay={1400} />

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <MagneticButton href="#projects" ariaLabel="View projects">
                <Button variant="primary" size="lg">View Projects</Button>
              </MagneticButton>
              <MagneticButton href={siteConfig.resumeUrl} ariaLabel="Download resume">
                <Button variant="outline" size="lg">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2 stroke-current" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download CV
                </Button>
              </MagneticButton>
              <MagneticButton href="#contact" ariaLabel="Contact me">
                <Button variant="ghost" size="lg">
                  Contact Me
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-2 stroke-current" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Button>
              </MagneticButton>
            </div>
          </div>

          <div className="shrink-0">
            <div className={cn('relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden border border-border/50 bg-bg-glass backdrop-blur-xl shadow-2xl shadow-primary/10', reduced ? '' : 'animate-float')}>
              <img src={siteConfig.photo} alt={`Portrait of ${siteConfig.name}`} className="w-full h-full object-cover" width={256} height={256} loading="eager" />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" aria-hidden="true" />
            </div>
          </div>
        </div>
      </Container>

      <ScrollIndicator targetId="about" />
    </section>
  );
}
```

---

## Task 1.6 — Wire Hero into Home Page

### src/app/page.tsx
```typescript
import { Hero } from '@/components/sections/Hero';
export default function HomePage() { return <><Hero /></>; }
```

---

## Task 1.7 — Update Root Layout with DeviceTierProvider

### src/app/layout.tsx — add import + nesting
```typescript
import { DeviceTierProvider } from '@/lib/providers/DeviceTierProvider';
// Wrap: <DeviceTierProvider><ThemeProvider>...rest...</ThemeProvider></DeviceTierProvider>
```

---

## Acceptance Criteria (No Inline CSS)

| Criterion | Verification |
|---|---|
| Zero `style={}` in any file created this phase | `rg 'style=\{(' src/ --include='*.tsx'` returns 0 new matches |
| Hero loads in < 2s on simulated 3G | DevTools → Network → Slow 3G, reload |
| 60 FPS on mid-range mobile | DevTools → Performance → record scroll |
| Typing animation plays once, cursor blinks | Observe full tagline typed out |
| Text scramble resolves name + title | Glitch chars → "Jelome Ngamuti" |
| CTA buttons keyboard accessible | Tab → Enter activates |
| Magnetic effect on desktop | Hover near → button moves toward cursor |
| Reduced motion: static gradient, no particles | `prefers-reduced-motion: reduce` → verify |
| Low tier: reduced particle count | Set deviceMemory=2 → verify |
| Photo glassmorphism frame | border + blur + shadow visible |
| Photo floats on 4s cycle | Gentle vertical oscillation |
| Animation delays via external classes | `rg 'animation-delay' src/` returns 0 (no inline) |
| All delays use `hero-delay-N` classes | Check globals.css for class definitions |
