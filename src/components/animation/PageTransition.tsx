'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

export function PageTransition({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (reduced) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      return;
    }

    gsap.fromTo(
      el,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
    );
  }, [pathname, reduced]);

  return <div ref={containerRef}>{children}</div>;
}
