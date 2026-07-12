import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteConfig } from '@/lib/data/site';

export function ResumeSection() {
  return (
    <section id="resume" className="py-24 md:py-32" aria-label="Resume">
      <Container className="text-center">
        <SectionHeading
          title="Resume"
          subtitle="Download my full resume for a complete overview of my experience."
        />

        <a
          href={siteConfig.resumeUrl}
          download
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary text-white font-semibold text-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
          aria-label="Download resume PDF"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download Resume (PDF)
        </a>
      </Container>
    </section>
  );
}
