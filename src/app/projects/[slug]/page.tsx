import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { projects } from '@/lib/data/projects';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Jelome Ngamuti`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Jelome Ngamuti`,
      description: project.description,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="pt-32 pb-24">
      <Container>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary mb-8 transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="stroke-current"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>

        <article>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="primary">{project.category}</Badge>
            {project.technologies.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-text-secondary mb-8 max-w-3xl">{project.description}</p>

          <div className="aspect-video rounded-xl overflow-hidden bg-surface mb-12">
            <img
              src={project.thumbnail}
              alt={`${project.title} screenshot`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl">
            <div className="lg:col-span-2 space-y-8">
              {project.challenges && project.challenges.length > 0 && (
                <section>
                  <h2 className="text-2xl font-semibold text-text-primary mb-4">Challenges</h2>
                  <ul className="space-y-2">
                    {project.challenges.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" aria-hidden="true" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {project.solutions && project.solutions.length > 0 && (
                <section>
                  <h2 className="text-2xl font-semibold text-text-primary mb-4">Solutions</h2>
                  <ul className="space-y-2">
                    {project.solutions.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" aria-hidden="true" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">Features</h2>
                <div className="flex flex-wrap gap-2">
                  {project.features.map((f) => (
                    <Badge key={f} variant="accent">
                      {f}
                    </Badge>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="stroke-current"
                    aria-hidden="true"
                  >
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg border border-primary text-primary font-medium hover:bg-primary/10 transition-colors"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  View Source
                </a>
              )}
            </aside>
          </div>
        </article>
      </Container>
    </main>
  );
}
