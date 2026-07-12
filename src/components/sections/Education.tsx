'use client';

import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/animation/Reveal';
import { education } from '@/lib/data/education';

export function Education() {
  return (
    <section
      id="education"
      className="py-24 md:py-32 bg-bg-alt/30"
      aria-label="Education"
    >
      <Container>
        <Reveal>
          <SectionHeading
            title="Education"
            subtitle="Academic background and coursework."
          />
        </Reveal>

        {education.length === 0 ? (
          <p className="text-center text-text-muted py-12">
            No education entries yet.
          </p>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {education.map((edu, i) => (
              <Reveal key={edu.id} delay={i * 0.15}>
                <GlassCard>
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-text-primary">
                        {edu.qualification}
                      </h3>
                      <p className="text-primary font-medium">
                        {edu.institution}
                      </p>
                      <p className="text-sm text-text-muted mt-1">
                        Graduated {edu.graduationYear}
                      </p>
                      {edu.coursework && edu.coursework.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {edu.coursework.map((c) => (
                            <Badge key={c} variant="primary">
                              {c}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
