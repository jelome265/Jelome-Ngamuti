'use client';

import { useState, useEffect, useCallback } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Reveal } from '@/components/animation/Reveal';
import { cn } from '@/lib/utils/cn';
import { testimonials } from '@/lib/data/testimonials';

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setActive((p) => (p + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setActive((p) => (p - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  if (testimonials.length === 0) return null;

  const current = testimonials[active];

  return (
    <section
      id="testimonials"
      className="py-24 md:py-32 bg-bg-alt/30"
      aria-label="Testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Container>
        <Reveal>
          <SectionHeading
            title="Testimonials"
            subtitle="What people say about working with me."
          />
        </Reveal>

        <div className="relative max-w-2xl mx-auto">
          <GlassCard className="text-center p-8 md:p-10">
            {/* Quote icon */}
            <svg
              className="w-8 h-8 text-primary/30 mx-auto mb-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
            </svg>

            <p className="text-lg text-text-secondary leading-relaxed mb-6">
              &ldquo;{current?.quote}&rdquo;
            </p>

            <div>
              <p className="font-semibold text-text-primary">
                {current?.author}
              </p>
              <p className="text-sm text-text-muted">{current?.title}</p>
            </div>
          </GlassCard>

          {testimonials.length > 1 && (
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={prev}
                className="p-2 rounded-full text-text-muted hover:text-text-primary hover:bg-surface transition-colors"
                aria-label="Previous testimonial"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <div
                className="flex gap-2"
                role="tablist"
                aria-label="Testimonial indicators"
              >
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={active === i}
                    onClick={() => setActive(i)}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300',
                      active === i
                        ? 'bg-primary w-6'
                        : 'bg-border w-2',
                    )}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="p-2 rounded-full text-text-muted hover:text-text-primary hover:bg-surface transition-colors"
                aria-label="Next testimonial"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
