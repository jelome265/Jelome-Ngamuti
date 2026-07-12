'use client';

import { lazy, Suspense } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { TextScramble } from '@/components/animation/TextScramble';
import { TypingAnimation } from '@/components/animation/TypingAnimation';
import { MagneticButton } from '@/components/animation/MagneticButton';
import { siteConfig } from '@/lib/data/site';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { useDeviceTier } from '@/lib/providers/DeviceTierProvider';
import { cn } from '@/lib/utils/cn';

const HeroParticles = lazy(() =>
  import('@/components/webgl/HeroParticles').then((m) => ({
    default: m.HeroParticles,
  })),
);

export function Hero() {
  const reduced = useReducedMotion();
  const { tier } = useDeviceTier();
  const showParticles = !reduced && tier !== 'low';

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      aria-label="Hero introduction"
    >
      {showParticles ? (
        <Suspense
          fallback={
            <div
              className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-bg"
              aria-hidden="true"
            />
          }
        >
          <HeroParticles />
        </Suspense>
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-bg"
          aria-hidden="true"
        />
      )}

      <div
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <p
              className={cn(
                'text-lg text-text-secondary font-medium mb-3',
                reduced ? '' : 'animate-fade-in hero-delay-1',
              )}
            >
              Hi, I&apos;m
            </p>

            <TextScramble
              text={siteConfig.name}
              as="h1"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary mb-4"
              duration={1.2}
              delay={0.3}
            />

            <TextScramble
              text={siteConfig.titles.join(' | ')}
              as="p"
              className="text-lg sm:text-xl text-primary font-mono mb-6"
              duration={0.8}
              delay={0.8}
            />

            <TypingAnimation
              text={siteConfig.tagline}
              className="text-base sm:text-lg text-text-secondary max-w-xl mb-8 leading-relaxed"
              speed={30}
              delay={1400}
            />

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <MagneticButton href="#projects" ariaLabel="View projects">
                <Button variant="primary" size="lg">
                  View Projects
                </Button>
              </MagneticButton>

              <MagneticButton href={siteConfig.resumeUrl} ariaLabel="Download resume">
                <Button variant="outline" size="lg">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="mr-2 stroke-current"
                    aria-hidden="true"
                  >
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download CV
                </Button>
              </MagneticButton>

              <MagneticButton href="#contact" ariaLabel="Contact me">
                <Button variant="ghost" size="lg">
                  Contact Me
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="ml-2 stroke-current"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Button>
              </MagneticButton>
            </div>
          </div>

          <div className="shrink-0">
            <div
              className={cn(
                'relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden border border-border/50 bg-bg-glass backdrop-blur-xl shadow-2xl shadow-primary/10',
                reduced ? '' : 'animate-float',
              )}
            >
              <img
                src={siteConfig.photo}
                alt={`Portrait of ${siteConfig.name}`}
                className="w-full h-full object-cover"
                width={256}
                height={256}
                loading="eager"
              />
              <div
                className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </Container>

      <ScrollIndicator targetId="about" />
    </section>
  );
}
