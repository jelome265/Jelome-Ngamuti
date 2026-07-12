'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { cn } from '@/lib/utils/cn';

interface TextScrambleProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  duration?: number;
  delay?: number;
  once?: boolean;
}

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#$%@&';

export function TextScramble({
  text,
  as: Tag = 'h1',
  className,
  duration = 1.2,
  delay = 0,
  once = true,
}: TextScrambleProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (reduced) {
      if (ref.current) ref.current.textContent = text;
      return;
    }
    if (once && hasAnimated.current) return;
    const el = ref.current;
    if (!el) return;
    hasAnimated.current = true;

    const timer = setTimeout(() => {
      const totalFrames = Math.floor(duration * 60);
      let frame = 0;

      function update() {
        const revealCount = Math.floor((frame / totalFrames) * text.length);
        el!.textContent = text
          .split('')
          .map((c, i) =>
            i < revealCount
              ? c
              : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)],
          )
          .join('');
        if (frame++ < totalFrames) {
          requestAnimationFrame(update);
        } else {
          el!.textContent = text;
        }
      }

      requestAnimationFrame(update);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [text, duration, delay, reduced, once]);

  return (
    <Tag
      ref={ref}
      className={cn('font-mono', className)}
      aria-label={text}
    />
  );
}
