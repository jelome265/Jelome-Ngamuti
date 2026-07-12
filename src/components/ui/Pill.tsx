'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils/cn';

interface PillProps {
  label: string;
  level?: number;
  gradient?: string;
  className?: string;
}

export function Pill({ label, level, gradient, className }: PillProps) {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (fillRef.current && level !== undefined) {
      fillRef.current.style.setProperty('--level', String(level));
    }
  }, [level]);

  return (
    <div className={cn('relative group', className)}>
      <div
        className={cn(
          'relative overflow-hidden rounded-full px-4 py-2 border border-border/50 transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-lg group-hover:shadow-primary/5',
          level !== undefined && 'pr-2'
        )}
      >
        {level !== undefined && (
          <div
            ref={fillRef}
            className={cn(
              'absolute inset-0 rounded-full pill-fill',
              gradient || 'bg-gradient-to-r from-primary to-accent'
            )}
            data-level={level}
            aria-hidden="true"
          />
        )}
        <div className="relative z-10 flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-text-primary">{label}</span>
          {level !== undefined && (
            <span className="text-xs text-text-muted tabular-nums">{level}%</span>
          )}
        </div>
      </div>
    </div>
  );
}
