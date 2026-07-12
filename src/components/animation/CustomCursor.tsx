'use client';

import { useEffect, useRef } from 'react';
import { useDeviceTier } from '@/lib/providers/DeviceTierProvider';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { cn } from '@/lib/utils/cn';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const { isTouch } = useDeviceTier();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (isTouch || reduced) return;

    document.body.style.cursor = 'none';

    const move = (e: MouseEvent) => {
      const cursor = cursorRef.current;
      const dot = dotRef.current;
      if (cursor) {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      if (dot) {
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const leave = () => {
      document.body.style.cursor = '';
    };

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
      <div
        ref={cursorRef}
        className={cn(
          'fixed top-0 left-0 w-6 h-6',
          'rounded-full border border-primary',
          'pointer-events-none z-[100]',
          '-translate-x-1/2 -translate-y-1/2',
          'transition-transform duration-75',
        )}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className={cn(
          'fixed top-0 left-0 w-2 h-2',
          'rounded-full bg-primary',
          'pointer-events-none z-[100]',
          '-translate-x-1/2 -translate-y-1/2',
          'transition-transform duration-75',
        )}
        aria-hidden="true"
      />
    </>
  );
}
