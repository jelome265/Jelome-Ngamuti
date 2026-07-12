'use client';

import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import { useDeviceTier } from '@/lib/providers/DeviceTierProvider';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  as?: 'a' | 'button';
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

export function MagneticButton({
  children,
  className,
  as: Tag = 'a',
  href,
  onClick,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { isTouch } = useDeviceTier();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const dist = Math.sqrt(x * x + y * y);
    const strength = Math.max(0, 1 - dist / 150);
    el.style.transform = `translate(${x * strength * 0.3}px, ${y * strength * 0.3}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  const handleClick = () => {
    if (Tag === 'a' && href) {
      if (href.startsWith('#')) {
        document
          .getElementById(href.slice(1))
          ?.scrollIntoView({ behavior: 'smooth' });
      } else if (href.startsWith('/')) {
        window.location.href = href;
      } else {
        window.open(href, '_blank', 'noopener noreferrer');
      }
    }
    onClick?.();
  };

  return (
    <div
      ref={ref}
      className={cn(
        'inline-block transition-transform duration-200 ease-out',
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Tag
        className="block"
        href={Tag === 'a' ? href : undefined}
        onClick={handleClick}
        aria-label={ariaLabel}
        role={Tag === 'a' ? undefined : 'button'}
        tabIndex={0}
      >
        {children}
      </Tag>
    </div>
  );
}
