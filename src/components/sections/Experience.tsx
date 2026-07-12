'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/animation/Reveal';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { experience } from '@/lib/data/experience';
import { formatDateRange } from '@/lib/utils/formatDate';

const typeColors: Record<string, string> = {
  internship: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  freelance: 'bg-green-500/10 text-green-400 border-green-500/20',
  volunteer: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  academic: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'full-time': 'bg-primary/10 text-primary border-primary/20',
};

export function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="experience" className="py-24 md:py-32" aria-label="Experience">
      <Container>
        <Reveal>
          <SectionHeading
            title="Experience"
            subtitle="Professional journey and hands-on work."
          />
        </Reveal>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div
            className="absolute left-[18px] top-0 bottom-0 w-[2px] bg-border/50"
            aria-hidden="true"
          />

          <div className="space-y-10">
            {experience.map((exp, i) => (
              <Reveal key={exp.id} delay={i * 0.15}>
                <div className="relative pl-12">
                  {/* Timeline dot */}
                  <div
                    className="absolute left-[11px] top-6 w-4 h-4 rounded-full border-2 border-primary bg-bg z-10"
                    aria-hidden="true"
                  />

                  <GlassCard
                    hover
                    className={cn(
                      'transition-all duration-300 text-left',
                      expandedId === exp.id && 'border-primary/30'
                    )}
                    onClick={() =>
                      setExpandedId(expandedId === exp.id ? null : exp.id)
                    }
                    as="button"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-semibold text-text-primary">
                            {exp.role}
                          </h3>
                          <Badge
                            variant="default"
                            className={cn('text-xs', typeColors[exp.type])}
                          >
                            {exp.type}
                          </Badge>
                        </div>
                        <p className="text-primary font-medium text-sm">
                          {exp.company}
                          {exp.location && (
                            <span className="text-text-muted font-normal">
                              {' '}
                              · {exp.location}
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-text-muted mt-1">
                          {formatDateRange(exp.startDate, exp.endDate)}
                        </p>
                      </div>

                      <motion.svg
                        animate={{ rotate: expandedId === exp.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="mt-1 shrink-0 text-text-muted"
                        aria-hidden="true"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </motion.svg>
                    </div>

                    <p className="text-text-secondary text-sm mt-3 leading-relaxed">
                      {exp.description}
                    </p>

                    <AnimatePresence>
                      {expandedId === exp.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <ul className="mt-4 space-y-2 border-t border-border/50 pt-4">
                            {exp.highlights.map((h, hi) => (
                              <li
                                key={hi}
                                className="flex items-start gap-2 text-sm text-text-secondary"
                              >
                                <span
                                  className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0"
                                  aria-hidden="true"
                                />
                                {h}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </GlassCard>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
