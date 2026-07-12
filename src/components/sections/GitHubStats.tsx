'use client';

import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { Reveal } from '@/components/animation/Reveal';
import { useGitHubStats } from '@/lib/hooks/useGitHubStats';
import { siteConfig } from '@/lib/data/site';
import { cn } from '@/lib/utils/cn';

const GITHUB_USER = siteConfig.social.github.split('/').filter(Boolean).pop() || 'jelome';

export function GitHubStats() {
  const { stats, loading, error } = useGitHubStats(GITHUB_USER);

  return (
    <section id="github" className="py-24 md:py-32 bg-bg-alt/30" aria-label="GitHub statistics">
      <Container>
        <Reveal>
          <SectionHeading
            title="GitHub Statistics"
            subtitle="Open-source activity and contributions."
          />
        </Reveal>

        {loading && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="h-28 rounded-xl" />
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <svg
              className="mx-auto w-12 h-12 text-text-muted/40 mb-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            <p className="text-text-muted">Unable to load GitHub data.</p>
            <p className="text-text-muted text-sm mt-1">{error}</p>
          </div>
        )}

        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <GlassCard className="text-center">
              <p className="text-3xl font-bold text-text-primary">{stats.publicRepos}</p>
              <p className="text-sm text-text-secondary mt-1">Public Repos</p>
            </GlassCard>
            <GlassCard className="text-center">
              <p className="text-3xl font-bold text-text-primary">{stats.totalStars}</p>
              <p className="text-sm text-text-secondary mt-1">Stars</p>
            </GlassCard>
            <GlassCard className="text-center">
              <p className="text-3xl font-bold text-text-primary">{stats.followers}</p>
              <p className="text-sm text-text-secondary mt-1">Followers</p>
            </GlassCard>
            <GlassCard className="text-center">
              <p className="text-3xl font-bold text-text-primary">
                {stats.topLanguages.length}
              </p>
              <p className="text-sm text-text-secondary mt-1">Languages</p>
            </GlassCard>
          </div>
        )}
      </Container>
    </section>
  );
}
