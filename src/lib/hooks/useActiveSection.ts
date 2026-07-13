'use client';

import { useState, useEffect } from 'react';
import { SECTION_RAIL_IDS } from '@/lib/config/navigation';

export function useActiveSection(): string {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );
    for (const id of SECTION_RAIL_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return active;
}
