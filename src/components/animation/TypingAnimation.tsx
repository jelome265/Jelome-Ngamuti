'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface TypingAnimationProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
}

export function TypingAnimation({
  text,
  speed = 40,
  delay = 800,
  className,
  showCursor = true,
}: TypingAnimationProps) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setDisplayed(text);
      setStarted(true);
      return;
    }
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [text, delay, reduced]);

  useEffect(() => {
    if (!started || reduced) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed, reduced]);

  useEffect(() => {
    if (reduced || !showCursor) return;
    const blink = setInterval(() => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity =
          cursorRef.current.style.opacity === '0' ? '1' : '0';
      }
    }, 530);
    return () => clearInterval(blink);
  }, [reduced, showCursor]);

  if (reduced) {
    return (
      <p className={className} role="text">
        {text}
      </p>
    );
  }

  return (
    <p className={cn('font-mono', className)} role="text" aria-label={text}>
      <span>{displayed}</span>
      {showCursor && (
        <span
          ref={cursorRef}
          className={cn(
            'inline-block w-[2px] h-[1em] bg-primary ml-0.5 align-middle',
            !started && 'opacity-100',
          )}
          aria-hidden="true"
        />
      )}
    </p>
  );
}
