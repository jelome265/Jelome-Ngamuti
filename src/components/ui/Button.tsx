'use client';

import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

type ButtonVariant = 'primary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  as?: 'button' | 'a';
  href?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-dark active:bg-primary-dark shadow-lg shadow-primary/20 hover:shadow-primary/30',
  outline:
    'border border-border bg-transparent text-text-primary hover:bg-surface active:bg-surface/80',
  ghost:
    'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface/50 active:bg-surface/80',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-base gap-2',
  lg: 'px-6 py-3 text-lg gap-2',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  as: Tag = 'button',
  href,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-primary cursor-pointer select-none',
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (Tag === 'a' && href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
