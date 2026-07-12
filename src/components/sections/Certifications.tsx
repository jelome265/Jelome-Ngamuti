'use client';

import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/animation/Reveal';
import { certifications } from '@/lib/data/certifications';
import { formatDate } from '@/lib/utils/formatDate';

export function Certifications() {
  return (
    <section
      id="certifications"
      className="py-24 md:py-32"
      aria-label="Certifications"
    >
      <Container>
        <Reveal>
          <SectionHeading
            title="Certifications"
            subtitle="Professional certifications and credentials."
          />
        </Reveal>

        {certifications.length === 0 ? (
          <p className="text-center text-text-muted py-12">
            No certifications yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {certifications.map((cert, i) => (
              <Reveal key={cert.id} delay={i * 0.1}>
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  aria-label={`${cert.name} — View credential`}
                >
                  <GlassCard hover>
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="accent">{cert.issuer}</Badge>
                    </div>
                    <h3 className="text-sm font-semibold text-text-primary mb-1">
                      {cert.name}
                    </h3>
                    <p className="text-xs text-text-muted">
                      {formatDate(cert.date)}
                    </p>
                  </GlassCard>
                </a>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
