'use client';

import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedCounter } from '@/components/animation/AnimatedCounter';
import { Reveal } from '@/components/animation/Reveal';
import { achievements } from '@/lib/data/achievements';
import { type ReactNode } from 'react';

const iconMap: Record<string, ReactNode> = {
  code: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="stroke-current"
      aria-hidden="true"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  award: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="stroke-current"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  ),
  zap: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="stroke-current"
      aria-hidden="true"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  clock: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="stroke-current"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
};

export function Achievements() {
  return (
    <section
      id="achievements"
      className="py-24 md:py-32 bg-bg-alt/30"
      aria-label="Achievements"
    >
      <Container>
        <Reveal>
          <SectionHeading
            title="Achievements"
            subtitle="Milestones and metrics from my journey."
          />
        </Reveal>

        {achievements.length === 0 ? (
          <p className="text-center text-text-muted py-12">
            No achievements to display yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {achievements.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.12}>
                <GlassCard className="text-center">
                  {a.icon && iconMap[a.icon] && (
                    <div className="text-primary mb-3 flex justify-center">
                      {iconMap[a.icon]}
                    </div>
                  )}
                  <div className="text-3xl md:text-4xl font-bold text-text-primary">
                    <AnimatedCounter
                      value={a.value}
                      suffix={a.suffix}
                      prefix={a.prefix}
                    />
                  </div>
                  <p className="text-sm text-text-secondary mt-1">{a.label}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
