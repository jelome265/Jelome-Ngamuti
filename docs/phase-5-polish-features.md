# Phase 5: Polish & Modern Features (Days 22–26)

**Goal:** Delightful details, loading states, cross-browser hardening. **No `style={}` inline CSS.**

**Dependencies:** All prior phases

---

## File Tree

```
src/
├── app/
│   ├── not-found.tsx                  # Updated — WebGL 404 scene
│   ├── globals.css                    # Updated — skeleton animations, transitions
│   └── page.tsx                       # Updated — Easter eggs, command palette
├── components/
│   ├── webgl/
│   │   ├── Scene404.tsx               # WebGL scene for 404 page
│   │   └── shaders/
│   │       └── ink-bleed.glsl
│   └── animation/
│       └── PageTransition.tsx
├── lib/
│   └── utils/
│       └── seo.ts                     # JSON-LD structured data
└── public/
    ├── images/og-default.jpg
    ├── robots.txt
    ├── sitemap.xml
    ├── ai.txt
    └── llms.txt
```

---

## Task 5.1 — Skeleton Loading Screens

Add skeleton classes to globals.css:

```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton-shimmer {
  background: linear-gradient(90deg, var(--color-surface) 25%, var(--color-bg-alt) 50%, var(--color-surface) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}
```

Apply existing `Skeleton` component to all async sections (GitHubStats, Testimonials if API-driven). Code-split heavy components with React.lazy + Suspense.

---

## Task 5.2 — Page Transitions (View Transition API + GSAP)

### src/components/animation/PageTransition.tsx

```typescript
'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export function PageTransition({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Entrance animation
    gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
  }, [pathname]);

  return <div ref={containerRef}>{children}</div>;
}
```

Wrap in `src/app/layout.tsx`: `<PageTransition><main>{children}</main></PageTransition>`

---

## Task 5.3 — Custom Cursor (Desktop Only)

```typescript
'use client';
import { useEffect, useRef } from 'react';
import { useDeviceTier } from '@/lib/providers/DeviceTierProvider';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const { isTouch } = useDeviceTier();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (isTouch || reduced) return;
    document.body.style.cursor = 'none';

    const move = (e: MouseEvent) => {
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      if (dotRef.current) dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    const leave = () => { document.body.style.cursor = ''; };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.body.style.cursor = '';
    };
  }, [isTouch, reduced]);

  if (isTouch || reduced) return null;

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-6 h-6 rounded-full border border-primary pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75" aria-hidden="true" />
      <div ref={dotRef} className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75" aria-hidden="true" />
    </>
  );
}
```

---

## Task 5.4 — Easter Eggs

Add to `src/app/page.tsx`:

- **Grid toggle (`Cmd+G`):** Toggles `data-grid="visible"` on `<html>`, CSS shows column guides overlay
- **Ruler guides:** Click center cross → toggle measurement lines (stored in CSS, triggered by class)

CSS for grid overlay in globals.css:
```css
[data-grid="visible"]::after {
  content: '';
  position: fixed; inset: 0;
  background-image: repeating-linear-gradient(90deg, rgba(59,130,246,0.1) 0px, rgba(59,130,246,0.1) 1px, transparent 1px, transparent calc((100% - 2rem) / 12));
  pointer-events: none;
  z-index: 9999;
}
```

---

## Task 5.5 — 404 Page with WebGL Scene

### src/components/webgl/Scene404.tsx

```typescript
'use client';
import { Canvas } from '@react-three/fiber';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.3;
      meshRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.2) * 0.5;
    }
  });
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#3b82f6" wireframe />
    </mesh>
  );
}

export function Scene404() {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 4] }} gl={{ antialias: false, alpha: true }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <FloatingGeometry />
      </Canvas>
    </div>
  );
}
```

### src/app/not-found.tsx (updated)

```typescript
import Link from 'next/link';
import { Scene404 } from '@/components/webgl/Scene404';

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Scene404 />
      <div className="relative z-10 text-center">
        <h1 className="text-8xl font-bold text-text-primary mb-4">404</h1>
        <p className="text-xl text-text-secondary mb-8">This page drifted into another dimension.</p>
        <Link href="/" className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors">Take Me Home</Link>
      </div>
    </div>
  );
}
```

---

## Task 5.6 — SEO & Structured Data

### public/robots.txt
```
User-agent: *
Allow: /
Sitemap: https://jelomengamuti.dev/sitemap.xml
```

### src/lib/utils/seo.ts
```typescript
export function personStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jelome Ngamuti',
    url: 'https://jelomengamuti.dev',
    jobTitle: 'Software Engineer',
    sameAs: ['https://github.com/jelome', 'https://linkedin.com/in/jelome'],
  };
}
```

Inject in layout.tsx via `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData()) }} />`

---

## Task 5.7 — Bundle Optimization

- Run `pnpm analyze` to visualize bundle
- Ensure all Three.js components are `React.lazy()`
- Verify dynamic imports for GSAP, Lenis
- Set `next.config.ts` turbopack optimizations

---

## Acceptance Criteria

| Criterion | Verification |
|---|---|
| Zero `style={}` anywhere | `rg 'style=\{(' src/` = 0 |
| Skeleton shimmer on async loading | Slow network → shimmer visible |
| Page transition entrance animation | Navigate → content fades in |
| Custom cursor on desktop | Cursor replaced by circle + dot |
| No custom cursor on touch | Mobile → default cursor |
| Grid toggle `Cmd+G` works | Press → column overlay visible |
| 404 page shows WebGL geometry + "Take Me Home" | Visit `/nonexistent` |
| 404 reduced motion: no scene | `prefers-reduced-motion: reduce` → no canvas |
| JSON-LD structured data present | View page source → find schema.org/Person |
| robots.txt returns proper rules | `/robots.txt` |
| OG image renders on social share | OpenGraph debugger |
| Bundle initial JS < 150 KB gzipped | `pnpm analyze` |
| All code-split chunks load lazily | DevTools Network → chunk files load on demand |
