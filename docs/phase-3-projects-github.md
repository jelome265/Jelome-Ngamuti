# Phase 3: Projects & GitHub Integration (Days 13–17)

**Goal:** Project showcase with filtering, case study pages, live GitHub stats. **No `style={}` inline CSS.**

**Dependencies:** Phase 0 (layout, UI primitives), Phase 2 (Reveal, TiltCard, Badge)

---

## File Tree

```
src/
├── app/
│   ├── page.tsx                              # FeaturedProjects, TechStack wired
│   └── projects/
│       ├── page.tsx                          # All projects grid
│       └── [slug]/page.tsx                   # Case study
├── components/
│   ├── sections/
│   │   ├── FeaturedProjects.tsx
│   │   ├── GitHubStats.tsx
│   │   └── TechStack.tsx
│   └── ui/
│       └── ProjectCard.tsx
├── lib/
│   ├── data/
│   │   └── projects.ts
│   ├── hooks/
│   │   └── useGitHubStats.ts
│   └── types/
│       └── project.ts
```

---

## Task 3.1 — Project Data

### src/lib/types/project.ts
```typescript
export type ProjectCategory = 'frontend' | 'backend' | 'fullstack' | 'devops' | 'database';
export interface Project {
  slug: string; title: string; description: string; longDescription?: string;
  thumbnail: string; screenshots: string[]; technologies: string[]; category: ProjectCategory;
  challenges?: string[]; solutions?: string[]; features: string[];
  liveUrl?: string; githubUrl?: string; featured: boolean; date: string;
}
```

### src/lib/data/projects.ts
```typescript
import { type Project } from '@/lib/types/project';
export const projects: Project[] = [
  {
    slug: 'bean-boutique', title: 'Bean Boutique Website',
    description: 'A responsive e-commerce site for a specialty coffee shop with product catalog, shopping cart, and contact form.',
    thumbnail: '/images/projects/bean-boutique-thumb.webp', screenshots: [],
    technologies: ['HTML', 'CSS', 'Bootstrap', 'JavaScript'],
    category: 'frontend',
    features: ['Responsive Design', 'Product Catalog', 'Shopping Cart', 'Contact Form'],
    liveUrl: '#', githubUrl: '#', featured: true, date: '2024-06',
  },
  {
    slug: 'task-management-api', title: 'Task Management API',
    description: 'RESTful API built with Node.js and Express for task management with JWT authentication and PostgreSQL.',
    thumbnail: '/images/projects/task-api-thumb.webp', screenshots: [],
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Docker'],
    category: 'backend',
    features: ['User Authentication', 'CRUD Operations', 'Role-Based Access', 'API Documentation'],
    liveUrl: '#', githubUrl: '#', featured: true, date: '2024-09',
  },
];
```

---

## Task 3.2 — ProjectCard Component

### src/components/ui/ProjectCard.tsx

```typescript
'use client';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { TiltCard } from '@/components/animation/TiltCard';
import { Reveal } from '@/components/animation/Reveal';
import { cn } from '@/lib/utils/cn';
import type { Project } from '@/lib/types/project';

interface ProjectCardProps { project: Project; index?: number; featured?: boolean; }

export function ProjectCard({ project, index = 0, featured = false }: ProjectCardProps) {
  return (
    <Reveal delay={index * 0.1}>
      <TiltCard className={cn('group h-full', featured && 'lg:col-span-2')}>
        <Link href={`/projects/${project.slug}`} className="block h-full" aria-label={`View ${project.title} case study`}>
          <div className={cn('relative overflow-hidden rounded-xl border border-border/50 bg-bg-glass backdrop-blur-xl transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-lg group-hover:shadow-primary/5 h-full')}>
            <div className="aspect-video bg-surface relative overflow-hidden">
              <img src={project.thumbnail} alt={`${project.title} screenshot`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="primary">{project.category}</Badge>
                {project.featured && <Badge variant="accent">Featured</Badge>}
              </div>
              <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors">{project.title}</h3>
              <p className="text-sm text-text-secondary mt-2 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {project.technologies.slice(0, 4).map(t => <Badge key={t}>{t}</Badge>)}
                {project.technologies.length > 4 && <Badge>+{project.technologies.length - 4}</Badge>}
              </div>
            </div>
          </div>
        </Link>
      </TiltCard>
    </Reveal>
  );
}
```

---

## Task 3.3 — FeaturedProjects Section

### src/components/sections/FeaturedProjects.tsx

Includes search, category filter, bento grid layout. All states: loading, empty results, filter active, search active.

```typescript
'use client';
import { useState, useMemo } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils/cn';
import { projects } from '@/lib/data/projects';
import type { ProjectCategory } from '@/lib/types/project';

const CATEGORIES: (ProjectCategory | 'all')[] = ['all', 'frontend', 'backend', 'fullstack', 'devops', 'database'];

export function FeaturedProjects() {
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = filter === 'all' ? projects : projects.filter(p => p.category === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.technologies.some(t => t.toLowerCase().includes(q)));
    }
    return list;
  }, [filter, search]);

  return (
    <section id="projects" className="py-24 md:py-32" aria-label="Featured projects">
      <Container>
        <SectionHeading title="Featured Projects" subtitle="A selection of projects showcasing my skills across the stack." />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
            {CATEGORIES.map(c => (
              <button key={c} role="tab" aria-selected={filter === c} onClick={() => setFilter(c)}
                className={cn('px-4 py-2 rounded-full text-sm font-medium transition-all duration-200', filter === c ? 'bg-primary text-white' : 'bg-surface text-text-secondary border border-border hover:text-text-primary')}>
                {c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            <input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects..." aria-label="Search projects"
              className="w-full pl-10 pr-4 py-2 rounded-full bg-surface border border-border text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors" />
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-text-muted text-lg">No projects match your criteria.</p>
            <button onClick={() => { setFilter('all'); setSearch(''); }} className="mt-4 text-primary hover:underline text-sm">Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} featured={p.featured} />)}
          </div>
        )}
      </Container>
    </section>
  );
}
```

---

## Task 3.4 — Project Detail Page

### src/app/projects/[slug]/page.tsx

```typescript
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { projects } from '@/lib/data/projects';

interface Props { params: Promise<{ slug: string }>; }

export async function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) notFound();

  return (
    <Container className="pt-32 pb-24">
      <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary mb-8 transition-colors">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stroke-current" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        Back to Projects
      </Link>

      <article>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="primary">{project.category}</Badge>
          {project.technologies.map(t => <Badge key={t}>{t}</Badge>)}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">{project.title}</h1>
        <p className="text-xl text-text-secondary mb-8 max-w-3xl">{project.description}</p>

        <div className="aspect-video rounded-xl overflow-hidden bg-surface mb-12">
          <img src={project.thumbnail} alt={`${project.title} screenshot`} className="w-full h-full object-cover" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl">
          <div className="lg:col-span-2 space-y-8">
            {project.challenges && (
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">Challenges</h2>
                <ul className="space-y-2">
                  {project.challenges.map((c, i) => <li key={i} className="flex items-start gap-2 text-text-secondary"><span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" aria-hidden="true" />{c}</li>)}
                </ul>
              </section>
            )}
            {project.solutions && (
              <section>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">Solutions</h2>
                <ul className="space-y-2">
                  {project.solutions.map((s, i) => <li key={i} className="flex items-start gap-2 text-text-secondary"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" aria-hidden="true" />{s}</li>)}
                </ul>
              </section>
            )}
            <section>
              <h2 className="text-2xl font-semibold text-text-primary mb-4">Features</h2>
              <div className="flex flex-wrap gap-2">{project.features.map(f => <Badge key={f} variant="accent">{f}</Badge>)}</div>
            </section>
          </div>

          <aside className="space-y-4">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stroke-current" aria-hidden="true"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg border border-primary text-primary font-medium hover:bg-primary/10 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                View Source
              </a>
            )}
          </aside>
        </div>
      </article>
    </Container>
  );
}
```

---

## Task 3.5 — GitHub Stats Hook

### src/lib/hooks/useGitHubStats.ts

```typescript
'use client';
import { useState, useEffect } from 'react';

interface GitHubStats { publicRepos: number; totalStars: number; followers: number; languages: Record<string, number>; }

export function useGitHubStats(username: string): { stats: GitHubStats | null; loading: boolean; error: string | null } {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchStats() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
        ]);
        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error');
        const user = await userRes.json();
        const repos = await reposRes.json();
        const totalStars = repos.reduce((sum: number, r: any) => sum + r.stargazers_count, 0);
        const languages: Record<string, number> = {};
        for (const r of repos) { if (r.language) languages[r.language] = (languages[r.language] || 0) + 1; }
        if (!cancelled) setStats({ publicRepos: user.public_repos, totalStars, followers: user.followers, languages });
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load GitHub stats');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchStats();
    return () => { cancelled = true; };
  }, [username]);

  return { stats, loading, error };
}
```

---

## Task 3.6 — GitHubStats Section

### src/components/sections/GitHubStats.tsx

States: loading (skeleton), loaded (data), error (fallback message).

```typescript
'use client';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { Reveal } from '@/components/animation/Reveal';
import { useGitHubStats } from '@/lib/hooks/useGitHubStats';
import { siteConfig } from '@/lib/data/site';

const GITHUB_USER = siteConfig.social.github.split('/').filter(Boolean).pop() || 'jelome';

export function GitHubStats() {
  const { stats, loading, error } = useGitHubStats(GITHUB_USER);

  return (
    <section id="github" className="py-24 md:py-32 bg-bg-alt/30" aria-label="GitHub statistics">
      <Container>
        <Reveal><SectionHeading title="GitHub Statistics" subtitle="Open-source activity and contributions." /></Reveal>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-28 rounded-xl" />)}
          </div>
        ) : error ? (
          <p className="text-center text-text-muted py-8">Unable to load GitHub data.</p>
        ) : stats ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <GlassCard className="text-center"><p className="text-3xl font-bold text-text-primary">{stats.publicRepos}</p><p className="text-sm text-text-secondary mt-1">Public Repos</p></GlassCard>
            <GlassCard className="text-center"><p className="text-3xl font-bold text-text-primary">{stats.totalStars}</p><p className="text-sm text-text-secondary mt-1">Stars</p></GlassCard>
            <GlassCard className="text-center"><p className="text-3xl font-bold text-text-primary">{stats.followers}</p><p className="text-sm text-text-secondary mt-1">Followers</p></GlassCard>
            <GlassCard className="text-center"><p className="text-3xl font-bold text-text-primary">{Object.keys(stats.languages).length}</p><p className="text-sm text-text-secondary mt-1">Languages</p></GlassCard>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
```

---

## Task 3.7 — TechStack Section

### src/components/sections/TechStack.tsx

```typescript
'use client';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Pill } from '@/components/ui/Pill';
import { Reveal } from '@/components/animation/Reveal';
import { skills } from '@/lib/data/skills';

export function TechStack() {
  return (
    <section id="tech-stack" className="py-24 md:py-32" aria-label="Technology stack">
      <Container>
        <Reveal><SectionHeading title="Tech Stack" subtitle="All technologies I work with at a glance." /></Reveal>
        <Reveal delay={0.2} stagger={0.03} id="tech-grid">
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto reveal-stagger-tech-grid">
            {skills.map(s => <Pill key={s.name} label={s.name} level={s.level} />)}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
```

---

## Task 3.8 — Wire into Home Page

### src/app/page.tsx (updated)
```typescript
// Add imports: FeaturedProjects, GitHubStats, TechStack
// Add to JSX: <FeaturedProjects /> <GitHubStats /> <TechStack />
```

---

## Acceptance Criteria

| Criterion | Verification |
|---|---|
| Zero `style={}` in Phase 3 files | Grep check returns 0 |
| Project cards render in bento grid | 3-column grid with images, badges |
| Category filter works | Click "Backend" → only backend projects |
| Search filters in real-time | Type → results update, debounced |
| Empty results shows "No projects" + clear action | Filter to empty → message + button |
| Project card hover: scale + tilt | Hover → card lifts, tilts 5deg |
| Project detail page shows challenges, solutions, features | Navigate to `/projects/bean-boutique` |
| GitHub stats loading state: skeleton | Slow network → skeleton grid |
| GitHub stats loaded state: numbers | Stats appear in 4-column grid |
| GitHub stats error state: fallback text | Block API → "Unable to load" message |
| Tech stack renders all skills as pills | Grid of 30+ skills |
| All external links `rel="noopener noreferrer"` | Inspect project links |
