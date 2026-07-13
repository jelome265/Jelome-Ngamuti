'use client';

import { useCallback } from 'react';
import { cn } from '@/lib/utils/cn';
import { useActiveSection } from '@/lib/hooks/useActiveSection';
import { NAV_LINKS, SECTION_RAIL_IDS } from '@/lib/config/navigation';

const railLinks = NAV_LINKS.filter((l) => SECTION_RAIL_IDS.includes(l.id as typeof SECTION_RAIL_IDS[number]));

export function SectionRail() {
  const activeSection = useActiveSection();

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-3"
    >
      {railLinks.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollTo(section.id)}
          className="group relative flex items-center justify-center"
          aria-label={`Navigate to ${section.label}`}
          aria-current={activeSection === section.id ? 'true' : undefined}
        >
          {/* Dot */}
          <span
            className={cn(
              'block rounded-full transition-all duration-300',
              activeSection === section.id
                ? 'w-2.5 h-2.5 bg-primary shadow-sm shadow-primary/40'
                : 'w-2 h-2 bg-border hover:bg-text-muted',
            )}
          />

          {/* Tooltip label */}
          <span
            className={cn(
              'absolute right-full mr-3 px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all duration-200 pointer-events-none',
              'bg-surface border border-border/50 text-text-secondary shadow-lg',
              'opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0',
            )}
          >
            {section.label}
          </span>
        </button>
      ))}
    </nav>
  );
}
