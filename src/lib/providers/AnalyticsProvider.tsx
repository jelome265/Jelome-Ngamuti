'use client';

import { useEffect, type ReactNode } from 'react';
import posthog from 'posthog-js';

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key || typeof window === 'undefined') return;

    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      autocapture: false,
      capture_pageview: false,
      loaded: (ph) => {
        if (process.env.NODE_ENV !== 'production') {
          ph.opt_out_capturing();
        }
      },
    });
  }, []);

  return <>{children}</>;
}
