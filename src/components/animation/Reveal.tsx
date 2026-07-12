'use client';

import { useEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { cn } from '@/lib/utils/cn';

gsap.registerPlugin(ScrollTrigger);

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const dirMap: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  duration?: number;
  delay?: number;
  distance?: number;
  stagger?: number;
  once?: boolean;
  as?: 'div' | 'section' | 'article' | 'span';
  id?: string;
}

export function Reveal({
  children,
  className,
  direction = 'up',
  duration = 0.6,
  delay = 0,
  distance = 40,
  stagger = 0,
  once = true,
  as: Tag = 'div',
  id,
}: RevealProps) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      const d = dirMap[direction];
      const revealId = id ?? 'default';

      if (stagger && stagger > 0) {
        const targets = `.reveal-stagger-${revealId} > *`;
        gsap.fromTo(
          targets,
          { opacity: 0, x: d.x * (distance / 40), y: d.y * (distance / 40) },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration,
            delay,
            stagger,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: `#reveal-${revealId}`,
              start: 'top 85%',
              once,
              toggleActions: once ? 'play none none none' : 'play none none reverse',
            },
          }
        );
      } else {
        gsap.fromTo(
          `#reveal-${revealId}`,
          { opacity: 0, x: d.x * (distance / 40), y: d.y * (distance / 40) },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: `#reveal-${revealId}`,
              start: 'top 85%',
              once,
              toggleActions: once ? 'play none none none' : 'play none none reverse',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [reduced, direction, duration, delay, distance, stagger, once, id]);

  const revealId = id ?? 'default';

  if (reduced) {
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      id={`reveal-${revealId}`}
      className={cn(className, stagger && stagger > 0 && `reveal-stagger-${revealId}`)}
    >
      {children}
    </Tag>
  );
}
