'use client';

import { cn } from '@/lib/utils/cn';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface ScrollIndicatorProps {
  targetId?: string;
  className?: string;
}

export function ScrollIndicator({
  targetId,
  className,
}: ScrollIndicatorProps) {
  const reduced = useReducedMotion();

  const handleClick = () => {
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer group',
        'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4',
        className,
      )}
      aria-label={targetId ? `Scroll to ${targetId}` : 'Scroll down'}
    >
      <span className="text-xs font-medium text-text-muted tracking-widest uppercase">
        Scroll
      </span>
      <div
        className={cn(
          'w-5 h-8 rounded-full border border-border flex items-start justify-center p-1',
          reduced ? '' : 'group-hover:border-primary transition-colors duration-300',
        )}
        aria-hidden="true"
      >
        <div
          className={cn(
            'w-1.5 h-1.5 rounded-full bg-primary',
            reduced ? 'opacity-60' : 'animate-bounce',
          )}
        />
      </div>
    </button>
  );
}
