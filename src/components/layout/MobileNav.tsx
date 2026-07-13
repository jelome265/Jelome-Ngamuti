'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { NAV_LINKS } from '@/lib/config/navigation';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onNavClick: (id: string) => void;
  activeSection: string;
}

export function MobileNav({
  isOpen,
  onClose,
  onNavClick,
  activeSection,
}: MobileNavProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  /* ── Focus trap + body scroll lock ── */
  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusableEls = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusableEls[0];
    const last = focusableEls[focusableEls.length - 1];

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !first || !last) return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    dialog.addEventListener('keydown', handleKeyDown);
    first?.focus();

    /* Lock body scroll */
    document.body.style.overflow = 'hidden';

    return () => {
      dialog.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={dialogRef}
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className={cn(
        'fixed inset-0 z-40 md:hidden transition-all duration-300 ease-out',
        isOpen
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0',
      )}
    >
      {/* Backdrop — click to close */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-down panel */}
      <div
        className={cn(
          'absolute inset-x-0 top-16 bg-bg-glass/95 backdrop-blur-2xl border-b border-border/50 shadow-2xl transition-all duration-300 ease-out',
          isOpen ? 'translate-y-0' : '-translate-y-3',
        )}
      >
        <ul className="flex flex-col px-4 py-6 gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => onNavClick(link.id)}
                className={cn(
                  'w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-200',
                  activeSection === link.id
                    ? 'text-primary bg-primary/10'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface/50',
                )}
                aria-current={activeSection === link.id ? 'true' : undefined}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
