'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  as?: 'div' | 'button' | 'article';
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  hover = false,
  as: Tag = 'div',
  onClick,
}: GlassCardProps) {
  return (
    <Tag
      onClick={onClick}
      className={cn(
        'rounded-2xl border border-border/50 bg-bg-glass backdrop-blur-xl p-6 md:p-8 transition-all duration-300',
        hover && 'hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5',
        onClick && 'cursor-pointer text-left w-full',
        className
      )}
    >
      {children}
    </Tag>
  );
}
