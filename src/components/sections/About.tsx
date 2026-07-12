'use client';

import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/animation/Reveal';
import { siteConfig } from '@/lib/data/site';

const interests = [
  'System Architecture',
  'Cloud-Native Development',
  'Database Performance',
  'Open Source',
  'AI/ML Integration',
];

const goals = [
  'Build scalable distributed systems',
  'Contribute to developer tooling',
  'Mentor junior engineers',
  'Push WebGL boundaries',
  'Ship production-grade software',
];

export function About() {
  return (
    <section id="about" className="py-24 md:py-32" aria-label="About me">
      <Container>
        <Reveal>
          <SectionHeading
            title="About Me"
            subtitle="Who I am, what I do, and what drives me."
          />
        </Reveal>

        <Reveal delay={0.2}>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl border border-border/50 bg-bg-glass backdrop-blur-xl p-8 md:p-10">
              <p className="text-lg leading-relaxed text-text-secondary whitespace-pre-line">
                {siteConfig.bio}
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                    Interests
                  </h3>
                  <ul className="space-y-2">
                    {interests.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-text-secondary"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
                    Career Goals
                  </h3>
                  <ul className="space-y-2">
                    {goals.map((goal) => (
                      <li
                        key={goal}
                        className="flex items-center gap-2 text-text-secondary"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0"
                          aria-hidden="true"
                        />
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
