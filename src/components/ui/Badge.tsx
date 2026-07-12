import { cn } from '@/lib/utils/cn';
import { type ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'warning';
  className?: string;
  icon?: ReactNode;
  onClick?: () => void;
}

const variantStyles: Record<string, string> = {
  default: 'bg-surface text-text-secondary border border-border',
  primary: 'bg-primary/10 text-primary border border-primary/20',
  accent: 'bg-accent/10 text-accent border border-accent/20',
  success: 'bg-success/10 text-success border border-success/20',
  warning: 'bg-accent/10 text-accent border border-accent/20',
};

export function Badge({
  children,
  variant = 'default',
  className,
  icon,
  onClick,
}: BadgeProps) {
  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200',
        variantStyles[variant],
        onClick && 'cursor-pointer hover:scale-105',
        className
      )}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') onClick();
            }
          : undefined
      }
    >
      {icon && (
        <span className="shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}
