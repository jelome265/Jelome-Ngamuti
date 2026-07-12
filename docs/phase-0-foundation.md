# Phase 0: Foundation (Days 1–3)

**Goal:** Skeleton, routing, design tokens, accessibility baseline.

**Dependencies:** None. This is the project seed.

---

## File Tree

```
jelome-ngamuti-portfolio/
├── .github/workflows/
│   ├── ci.yml
│   └── deploy.yml
├── public/
│   ├── images/
│   │   └── avatar.webp
│   ├── favicon.ico
│   └── apple-touch-icon.png
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── not-found.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ScrollProgress.tsx
│   │   │   ├── BackToTop.tsx
│   │   │   └── SectionRail.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── SectionHeading.tsx
│   │       ├── Container.tsx
│   │       ├── GlassCard.tsx
│   │       ├── Skeleton.tsx
│   │       ├── LoadingSpinner.tsx
│   │       └── ScrollIndicator.tsx
│   ├── lib/
│   │   ├── data/
│   │   │   └── site.ts
│   │   ├── hooks/
│   │   │   ├── useScrollProgress.ts
│   │   │   ├── useReducedMotion.ts
│   │   │   ├── useIntersectionObserver.ts
│   │   │   ├── useTheme.ts
│   │   │   └── useActiveSection.ts
│   │   ├── utils/
│   │   │   ├── cn.ts
│   │   │   ├── clamp.ts
│   │   │   └── fluid.ts
│   │   ├── providers/
│   │   │   ├── ThemeProvider.tsx
│   │   │   ├── LenisProvider.tsx
│   │   │   └── AnalyticsProvider.tsx
│   │   └── types/
│   │       └── site.ts
│   └── middleware.ts
├── .env.local
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── next.config.ts
├── tsconfig.json
├── pnpm-lock.yaml
├── package.json
└── AGENTS.md
```

---

## Task 0.1 — Project Initialization

### Command Sequence

```bash
node --version  # Must be 22.x
pnpm create next-app@latest . --typescript --eslint --app --src-dir --import-alias "@/*" --turbo
pnpm add gsap framer-motion lenis @react-three/fiber @react-three/drei three @emailjs/browser posthog-js react-hook-form @hookform/resolvers zod clsx tailwind-merge
pnpm add -D @types/three prettier eslint-config-prettier
```

### package.json

```jsonc
{
  "name": "jelome-ngamuti-portfolio",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "engines": { "node": ">=22.0.0" },
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "next lint && tsc --noEmit",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\""
  }
}
```

### next.config.ts (Next.js 16)

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {},
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 768, 1024, 1280, 1440, 1920],
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
      ],
    },
  ],
};

export default nextConfig;
```

### tsconfig.json (TypeScript 5 strict)

```jsonc
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": false,
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

---

## Task 0.2 — Design Tokens & CSS Foundation

### src/app/globals.css

External only — all design tokens as CSS custom properties. No `style={}` anywhere in the app.

```css
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  --color-primary-dark: #1d4ed8;
  --color-primary-light: #60a5fa;
  --color-bg: #0a0a0f;
  --color-bg-alt: #12121a;
  --color-bg-glass: rgba(18, 18, 26, 0.6);
  --color-surface: #1a1a24;
  --color-border: #2a2a3a;
  --color-text-primary: #f1f5f9;
  --color-text-secondary: #94a3b8;
  --color-text-muted: #64748b;
  --color-accent: #f59e0b;
  --color-success: #22c55e;
  --color-error: #ef4444;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 3.75rem;
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-full: 9999px;
}

.light {
  --color-bg: #f8fafc;
  --color-bg-alt: #f1f5f9;
  --color-bg-glass: rgba(248, 250, 252, 0.7);
  --color-surface: #ffffff;
  --color-border: #e2e8f0;
  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
  --color-text-muted: #94a3b8;
}

@layer base {
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    background-color: var(--color-bg);
    color: var(--color-text-primary);
    font-family: Inter, system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  ::selection {
    background-color: var(--color-primary);
    color: white;
  }
  *:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}

/* ===== DYNAMIC UTILITY CLASSES ===== */
/* Used by ScrollProgress — set via ref DOM manipulation, not style= */
.scroll-progress-bar {
  transform-origin: left;
  transition: transform 0.15s ease-out;
}

/* Used by Pill — width set via dataset attribute, read by CSS */
.pill-fill[data-level]::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0.1;
}

/* Used by Hero animation delays — class-based delays */
.hero-delay-1 { animation-delay: 200ms; animation-fill-mode: both; }
.hero-delay-2 { animation-delay: 400ms; animation-fill-mode: both; }
.hero-delay-3 { animation-delay: 600ms; animation-fill-mode: both; }

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.animate-fade-in { animation: fade-in 0.6s ease-out both; }
.animate-float { animation: float 4s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .animate-fade-in, .animate-float { animation: none !important; }
}
```

---

## Task 0.3 — Utility Functions

### src/lib/utils/cn.ts
```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

### src/lib/utils/clamp.ts
```typescript
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
```

### src/lib/utils/fluid.ts
```typescript
interface FluidOptions { minWidth?: number; maxWidth?: number; }
function toRem(px: number): string { return `${px / 16}rem`; }
export function fluid(minSize: number, maxSize: number, options: FluidOptions = {}): string {
  const { minWidth = 480, maxWidth = 2560 } = options;
  const slope = (maxSize - minSize) / (maxWidth - minWidth);
  const yAxisIntersection = -minWidth * slope + minSize;
  return `clamp(${toRem(minSize)}, ${toRem(yAxisIntersection)} + ${slope * 100}vw, ${toRem(maxSize)})`;
}
```

---

## Task 0.4 — Types & Data

### src/lib/types/site.ts
```typescript
export interface SiteConfig {
  name: string;
  monogram: string;
  titles: string[];
  tagline: string;
  bio: string;
  photo: string;
  resumeUrl: string;
  social: { github: string; linkedin: string; email: string; phone?: string; };
  builtWith: string[];
}
```

### src/lib/data/site.ts
```typescript
import { type SiteConfig } from '@/lib/types/site';
export const siteConfig: SiteConfig = {
  name: 'Jelome Ngamuti',
  monogram: 'JN',
  titles: ['System Engineer', 'Software Engineer', 'Full-Stack Developer', 'Database Engineer'],
  tagline: 'I build secure, scalable, and user-focused software solutions.',
  bio: `Detail-oriented software engineer with expertise across the full stack — from responsive frontends to robust backends in Node.js, Django, Spring Boot. Experienced in database design, cloud infrastructure, and DevOps.`,
  photo: '/images/avatar.webp',
  resumeUrl: '/resume.pdf',
  social: {
    github: 'https://github.com/jelome',
    linkedin: 'https://linkedin.com/in/jelome',
    email: 'jelome@example.com',
  },
  builtWith: ['Next.js', 'TypeScript', 'Three.js', 'GSAP', 'Tailwind CSS'],
};
```

---

## Task 0.5 — Providers

### src/lib/providers/ThemeProvider.tsx

No inline `style={}`. Uses CSS class toggling and meta tag manipulation via DOM methods.

```typescript
'use client';

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';

type Theme = 'dark' | 'light' | 'system';
interface ThemeContextValue { theme: Theme; resolved: 'dark' | 'light'; setTheme: (t: Theme) => void; toggle: () => void; }

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = 'jn-portfolio-theme';

function getSystemPreference(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(theme: Theme): 'dark' | 'light' {
  return theme === 'system' ? getSystemPreference() : theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolved, setResolved] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial = stored ?? 'system';
    setThemeState(initial);
    setResolved(resolveTheme(initial));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.toggle('light', resolved === 'light');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', resolved === 'dark' ? '#0a0a0f' : '#f8fafc');
  }, [resolved, mounted]);

  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setResolved(getSystemPreference());
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    setResolved(resolveTheme(t));
    localStorage.setItem(STORAGE_KEY, t);
  }, []);

  const toggle = useCallback(() => {
    setTheme(resolved === 'dark' ? 'light' : 'dark');
  }, [resolved, setTheme]);

  if (!mounted) {
    return <div className="invisible">{children}</div>;  // No inline style
  }

  return (
    <ThemeContext.Provider value={{ theme, resolved, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
```

### src/lib/providers/LenisProvider.tsx
```typescript
'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import Lenis from 'lenis';

interface LenisContextValue { lenis: Lenis | null; isReady: boolean; }
const LenisContext = createContext<LenisContextValue>({ lenis: null, isReady: false });

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (isTouchDevice) { setIsReady(true); return; }
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });
    lenisRef.current = lenis;
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    setIsReady(true);
    return () => { lenis.destroy(); lenisRef.current = null; };
  }, [isTouchDevice]);

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current, isReady }}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenis(): LenisContextValue {
  return useContext(LenisContext);
}
```

### src/lib/providers/AnalyticsProvider.tsx
```typescript
'use client';
import { useEffect, type ReactNode } from 'react';
import posthog from 'posthog-js';

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key || typeof window === 'undefined') return;
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      autocapture: false,
      capture_pageview: false,
      loaded: (ph) => { if (process.env.NODE_ENV !== 'production') ph.opt_out_capturing(); },
    });
  }, []);
  return <>{children}</>;
}
```

---

## Task 0.6 — Custom Hooks

### src/lib/hooks/useScrollProgress.ts
```typescript
'use client';
import { useState, useEffect } from 'react';
import { clamp } from '@/lib/utils/clamp';

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? clamp(scrollTop / docHeight, 0, 1) : 0);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return progress;
}
```

### src/lib/hooks/useReducedMotion.ts
```typescript
'use client';
import { useState, useEffect } from 'react';
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}
```

### src/lib/hooks/useIntersectionObserver.ts
```typescript
'use client';
import { useEffect, useRef, useState, type RefObject } from 'react';

interface UseIOOptions { threshold?: number; rootMargin?: string; once?: boolean; }
export function useIntersectionObserver<T extends HTMLElement>(
  options: UseIOOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0.1, rootMargin = '0px', once = true } = options;
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) { setIsVisible(true); if (once) observer.unobserve(el); }
        else if (!once) setIsVisible(false);
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);
  return [ref, isVisible];
}
```

### src/lib/hooks/useActiveSection.ts
```typescript
'use client';
import { useState, useEffect } from 'react';

const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];

export function useActiveSection(): string {
  const [active, setActive] = useState('hero');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { for (const e of entries) { if (e.isIntersecting) setActive(e.target.id); } },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );
    for (const id of SECTION_IDS) { const el = document.getElementById(id); if (el) observer.observe(el); }
    return () => observer.disconnect();
  }, []);
  return active;
}
```

### src/lib/hooks/useTheme.ts
```typescript
export { useTheme } from '@/lib/providers/ThemeProvider';
```

---

## Task 0.7 — UI Primitives

### src/components/ui/Button.tsx

No inline `style={}`. All variants/sizes via className. Loading spinner via JSX + cn().

```typescript
'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-dark active:scale-[0.97] shadow-lg shadow-primary/20',
  secondary: 'bg-surface text-text-primary hover:bg-border border border-border active:scale-[0.97]',
  ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface/50',
  outline: 'bg-transparent text-primary border border-primary hover:bg-primary/10 active:scale-[0.97]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-base gap-2',
  lg: 'px-7 py-3.5 text-lg gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, icon, className, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 select-none',
        'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        variantStyles[variant], sizeStyles[size],
        loading && 'cursor-wait',
        className
      )}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      )}
      {icon && <span className="shrink-0" aria-hidden="true">{icon}</span>}
      {children}
    </button>
  )
);
Button.displayName = 'Button';
```

### src/components/ui/SectionHeading.tsx
```typescript
import { cn } from '@/lib/utils/cn';
import { type ReactNode } from 'react';

interface Props { title: string; subtitle?: string; align?: 'left' | 'center'; className?: string; as?: 'h2' | 'h3'; children?: ReactNode; }

export function SectionHeading({ title, subtitle, align = 'center', className, as: Tag = 'h2', children }: Props) {
  return (
    <div className={cn('mb-12 md:mb-16', align === 'center' && 'text-center', className)}>
      <Tag className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
        {title}
      </Tag>
      {subtitle && (
        <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      )}
      {children}
    </div>
  );
}
```

### src/components/ui/Container.tsx
```typescript
import { cn } from '@/lib/utils/cn';
import { type ReactNode } from 'react';

interface Props { children: ReactNode; className?: string; as?: 'div' | 'section' | 'article'; id?: string; }

export function Container({ children, className, as: Tag = 'div', id }: Props) {
  return <Tag id={id} className={cn('mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8', className)}>{children}</Tag>;
}
```

### src/components/ui/GlassCard.tsx
```typescript
import { cn } from '@/lib/utils/cn';
import { type ReactNode } from 'react';

interface Props { children: ReactNode; className?: string; hover?: boolean; as?: 'div' | 'article' | 'button'; onClick?: () => void; }

export function GlassCard({ children, className, hover = false, as: Tag = 'div', onClick }: Props) {
  return (
    <Tag
      onClick={onClick}
      className={cn(
        'rounded-xl border border-border/50 bg-bg-glass backdrop-blur-xl p-6',
        'transition-all duration-300',
        hover && 'hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5',
        onClick && 'cursor-pointer', className
      )}
      {...(onClick ? { role: 'button', tabIndex: 0 } : {})}
    >
      {children}
    </Tag>
  );
}
```

### src/components/ui/Skeleton.tsx

No inline `style={}`. Sizes predefined via Tailwind classes or className passthrough.

```typescript
import { cn } from '@/lib/utils/cn';

interface SkeletonProps { className?: string; variant?: 'text' | 'circular' | 'rectangular'; }

export function Skeleton({ className, variant = 'text' }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-surface rounded-md',
        variant === 'circular' && 'rounded-full',
        variant === 'rectangular' && 'rounded-lg',
        className
      )}
      aria-hidden="true"
    />
  );
}
```

### src/components/ui/LoadingSpinner.tsx
```typescript
import { cn } from '@/lib/utils/cn';

const sizeMap = { sm: 'h-5 w-5', md: 'h-8 w-8', lg: 'h-12 w-12' };

interface Props { size?: 'sm' | 'md' | 'lg'; className?: string; label?: string; }

export function LoadingSpinner({ size = 'md', className, label = 'Loading...' }: Props) {
  return (
    <div role="status" className={cn('flex items-center justify-center', className)}>
      <svg className={cn('animate-spin text-primary', sizeMap[size])} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
}
```

### src/components/ui/ScrollIndicator.tsx

No inline `style={}`. Visibility via Tailwind classes toggled with cn().

```typescript
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';

interface Props { targetId?: string; className?: string; }

export function ScrollIndicator({ targetId = 'about', className }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY < 100);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2',
        'text-text-muted hover:text-primary transition-colors duration-300',
        'animate-bounce',
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none',
        className
      )}
      aria-label={`Scroll to ${targetId} section`}
    >
      <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stroke-current" aria-hidden="true">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  );
}
```

---

## Task 0.8 — Layout Components

### src/components/layout/Navbar.tsx

```typescript
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { useTheme } from '@/lib/providers/ThemeProvider';
import { useActiveSection } from '@/lib/hooks/useActiveSection';
import { siteConfig } from '@/lib/data/site';

const NAV_LINKS = [
  { href: '#about', label: 'About' }, { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' }, { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { resolved, toggle } = useTheme();
  const activeSection = useActiveSection();
  const [prevScroll, setPrevScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 50);
      setHidden(current > 100 && current > prevScroll);
      setPrevScroll(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScroll]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-bg-glass backdrop-blur-2xl border-b border-border/50 shadow-lg shadow-black/5' : 'bg-transparent',
        hidden ? '-translate-y-full' : 'translate-y-0'
      )}
      role="banner"
    >
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Link href="/" className="text-xl font-bold tracking-widest text-text-primary hover:text-primary transition-colors" aria-label={`${siteConfig.name} — Home`}>
          {siteConfig.monogram}
        </Link>
        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn('relative text-sm font-medium transition-colors duration-200 py-2', isActive ? 'text-primary' : 'text-text-secondary hover:text-text-primary')}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {link.label}
                  {isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" aria-hidden="true" />}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-3">
          <button onClick={toggle} className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface/50 transition-colors" aria-label={`Switch to ${resolved === 'dark' ? 'light' : 'dark'} mode`}>
            {resolved === 'dark' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>
          <a href="#contact" className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors">Contact</a>
        </div>
      </nav>
    </header>
  );
}
```

### src/components/layout/MobileNav.tsx

```typescript
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';

const NAV_LINKS = [
  { href: '#about', label: 'About' }, { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' }, { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' }, { href: '#contact', label: 'Contact' },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);
  const handleClick = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(!open)} className="p-2 text-text-secondary" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>
      {open && (
        <div className="fixed inset-0 top-16 z-40 bg-bg/95 backdrop-blur-xl" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <nav className="flex flex-col items-center justify-center h-full gap-8">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={handleClick} className="text-2xl font-medium text-text-secondary hover:text-text-primary transition-colors">{link.label}</a>
            ))}
            <a href="#contact" onClick={handleClick} className="mt-4 px-8 py-3 rounded-lg bg-primary text-white text-lg font-medium">Contact Me</a>
          </nav>
        </div>
      )}
    </div>
  );
}
```

### src/components/layout/Footer.tsx

```typescript
import { siteConfig } from '@/lib/data/site';
import { Container } from '@/components/ui/Container';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/50 py-12 mt-24" role="contentinfo">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-sm text-text-muted">&copy; {year} {siteConfig.name}. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-primary transition-colors" aria-label="GitHub profile">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-primary transition-colors" aria-label="LinkedIn profile">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
          <p className="text-xs text-text-muted">Built with {siteConfig.builtWith.join(', ')}</p>
        </div>
      </Container>
    </footer>
  );
}
```

### src/components/layout/ScrollProgress.tsx

No inline `style={}`. Uses ref + DOM manipulation for dynamic width.

```typescript
'use client';

import { useRef, useEffect } from 'react';
import { useScrollProgress } from '@/lib/hooks/useScrollProgress';

export function ScrollProgress() {
  const progress = useScrollProgress();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (el) {
      el.style.transform = `scaleX(${progress})`;
    }
  }, [progress]);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none" role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100} aria-label="Page scroll progress">
      <div ref={barRef} className="h-full bg-gradient-to-r from-primary to-accent scroll-progress-bar" />
    </div>
  );
}
```

### src/components/layout/BackToTop.tsx

```typescript
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const h = () => setVisible(window.scrollY > 500); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h); }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <button onClick={scrollToTop} className={cn('fixed bottom-6 right-6 z-40 p-3 rounded-full shadow-lg bg-surface border border-border text-text-secondary hover:text-primary hover:border-primary transition-all duration-300', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none')} aria-label="Back to top">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stroke-current" aria-hidden="true"><path d="M18 15l-6-6-6 6" /></svg>
    </button>
  );
}
```

### src/components/layout/SectionRail.tsx

```typescript
'use client';

import { useActiveSection } from '@/lib/hooks/useActiveSection';
import { cn } from '@/lib/utils/cn';

const SECTIONS = [
  { id: 'hero', label: 'Home' }, { id: 'about', label: 'About' }, { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' }, { id: 'experience', label: 'Experience' }, { id: 'contact', label: 'Contact' },
];

export function SectionRail() {
  const active = useActiveSection();
  return (
    <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3" aria-label="Section navigation">
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <a key={s.id} href={`#${s.id}`} className="group flex items-center gap-3" aria-label={`Navigate to ${s.label}`} aria-current={isActive ? 'true' : undefined}>
            <span className={cn('block rounded-full transition-all duration-300', isActive ? 'w-3 h-3 bg-primary' : 'w-2 h-2 bg-border group-hover:bg-text-muted')} />
            <span className={cn('text-xs tracking-wider transition-all duration-300 opacity-0 group-hover:opacity-100', isActive ? 'text-primary opacity-100' : 'text-text-muted')}>{s.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
```

---

## Task 0.9 — Root Layout

### src/app/layout.tsx (Next.js 16 App Router)

```typescript
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Sacramento } from 'next/font/google';
import { ThemeProvider } from '@/lib/providers/ThemeProvider';
import { LenisProvider } from '@/lib/providers/LenisProvider';
import { AnalyticsProvider } from '@/lib/providers/AnalyticsProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { BackToTop } from '@/components/layout/BackToTop';
import { SectionRail } from '@/components/layout/SectionRail';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap', weight: ['400', '500'] });
const sacramento = Sacramento({ subsets: ['latin'], variable: '--font-signature', display: 'swap', weight: '400' });

export const metadata: Metadata = {
  title: { default: 'Jelome Ngamuti — Software Engineer & Full-Stack Developer', template: '%s — Jelome Ngamuti' },
  description: 'I build secure, scalable, and user-focused software solutions.',
  metadataBase: new URL('https://jelomengamuti.dev'),
  openGraph: {
    title: 'Jelome Ngamuti — Software Engineer & Full-Stack Developer',
    description: 'I build secure, scalable, and user-focused software solutions.',
    url: 'https://jelomengamuti.dev',
    siteName: 'Jelome Ngamuti',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
    locale: 'en_US', type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Jelome Ngamuti — Software Engineer', description: 'I build secure, scalable, and user-focused software solutions.', images: ['/images/og-default.jpg'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} ${sacramento.variable}`}>
      <head><meta name="theme-color" content="#0a0a0f" /></head>
      <body className="min-h-screen bg-bg text-text-primary antialiased">
        <ThemeProvider>
          <LenisProvider>
            <AnalyticsProvider>
              <Navbar />
              <ScrollProgress />
              <SectionRail />
              <main id="main-content" role="main">{children}</main>
              <Footer />
              <BackToTop />
            </AnalyticsProvider>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## Task 0.10 — Skeleton Pages

### src/app/page.tsx
```typescript
export default function HomePage() { return <>{/* Sections wired in per phase */}</>; }
```

### src/app/projects/page.tsx
```typescript
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Projects', description: 'Browse my portfolio of software engineering projects.' };
export default function ProjectsPage() { return <div className="pt-32 pb-24 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">{/* Phase 3: Project grid */}</div>; }
```

### src/app/projects/[slug]/page.tsx
```typescript
import type { Metadata } from 'next';
interface Props { params: Promise<{ slug: string }>; }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: `Project: ${slug}`, description: `Case study for ${slug}` };
}
export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  return <div className="pt-32 pb-24 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">{/* Phase 3 */}</div>;
}
```

### src/app/about/page.tsx
```typescript
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'About', description: 'Learn more about Jelome Ngamuti.' };
export default function AboutPage() { return <div className="pt-32 pb-24 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">{/* Extended bio */}</div>; }
```

### src/app/contact/page.tsx
```typescript
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Contact', description: 'Get in touch.' };
export default function ContactPage() { return <div className="pt-32 pb-24 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">{/* Contact form */}</div>; }
```

### src/app/not-found.tsx
```typescript
import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="pt-32 pb-24 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-6xl font-bold text-text-primary mb-4">404</h1>
      <p className="text-xl text-text-secondary mb-8">This page does not exist.</p>
      <Link href="/" className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors">Go Home</Link>
    </div>
  );
}
```

---

## Task 0.11 — CI/CD & Middleware

### src/middleware.ts
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.posthog.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://*.posthog.com https://api.github.com",
    "frame-ancestors 'none'", "base-uri 'self'", "form-action 'self'",
  ];
  response.headers.set('Content-Security-Policy', csp.join('; '));
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  return response;
}
```

### .github/workflows/ci.yml
```yaml
name: CI
on: [push, pull_request]
jobs:
  lint-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with: { node-version: '22', cache: 'pnpm' }
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm type-check
```

---

## Acceptance Criteria (No Inline CSS)

| Criterion | Verification |
|---|---|
| Zero `style={}` props across all files | `rg 'style=\{(' src/ --include='*.tsx'` returns 0 matches |
| All pages render with correct layout | Manual: visit `/`, `/projects`, `/about`, `/contact`, `/projects/test`, `/nonexistent` |
| Theme toggle persists, no FOUC | Toggle dark→light, navigate pages, verify class on `<html>` |
| Lenis smooth scroll active on desktop | Scroll → smooth deceleration |
| Native scroll on touch devices | Mobile → no Lenis interference |
| Lighthouse a11y score 95+ | `lighthouse --accessibility` |
| Keyboard navigable, focus rings visible | Tab through every element |
| Navbar transparent on hero, solid after scroll | Scroll down 50px → bg-glass appears |
| Scroll progress bar via DOM ref manipulation | Thin bar at top fills left-to-right |
| Back-to-top appears at 500px scroll | Button fades in at bottom-right |
| CSP headers on all routes | Inspect → Content-Security-Policy present |
| No console errors | DevTools console on every page |
| `pnpm lint` passes with zero warnings | Run `pnpm lint` |
| `pnpm type-check` passes with zero errors | Run `pnpm type-check` |
| Build succeeds with Next.js 16 | `pnpm build` completes |
| `node --version` is 22.x | Verify engine |
| TypeScript 5 strict mode | Check `tsconfig.json` has `"strict": true` |
| Tailwind 4.x classes resolve | Verify no unknown utility warnings |
