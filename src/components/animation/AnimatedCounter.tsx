'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils/cn';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  formatter?: (v: number) => string;
}

function mergeRefs<T>(...refs: Array<React.RefCallback<T> | React.MutableRefObject<T | null> | null | undefined>) {
  return (el: T) => {
    refs.forEach((r) => {
      if (typeof r === 'function') r(el);
      else if (r && 'current' in r) r.current = el;
    });
  };
}

export function AnimatedCounter({
  value,
  duration = 2000,
  suffix = '',
  prefix = '',
  className,
  formatter,
}: AnimatedCounterProps) {
  const [ref, isVisible] = useIntersectionObserver<HTMLSpanElement>({ threshold: 0.5, once: true });
  const startedRef = useRef(false);
  const reduced = useReducedMotion();
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduced) {
      if (spanRef.current) {
        spanRef.current.textContent = formatter ? formatter(value) : `${prefix}${value}${suffix}`;
      }
      return;
    }

    if (!isVisible || startedRef.current) return;

    startedRef.current = true;
    const startTime = performance.now();

    function animate(t: number) {
      const progress = Math.min((t - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * value);

      if (spanRef.current) {
        spanRef.current.textContent = formatter
          ? formatter(current)
          : `${prefix}${current}${suffix}`;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isVisible, value, duration, reduced, prefix, suffix, formatter]);

  return (
    <span
      ref={mergeRefs(ref, spanRef)}
      className={cn('tabular-nums', className)}
      aria-live="polite"
    />
  );
}
