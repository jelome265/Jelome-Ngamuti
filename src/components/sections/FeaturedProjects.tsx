'use client';

import { useState, useMemo, useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { cn } from '@/lib/utils/cn';
import { projects } from '@/lib/data/projects';
import { CATEGORIES } from '@/lib/config/project-categories';
import type { ProjectCategory } from '@/lib/types/project';

export function FeaturedProjects() {
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all');
  const [search, setSearch] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  const filtered = useMemo(() => {
    let list = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q)),
      );
    }

    return list;
  }, [filter, search]);

  const handleSearchChange = (value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearch(value);
    }, 200);
  };

  return (
    <section id="projects" className="py-24 md:py-32" aria-label="Featured projects">
      <Container>
        <SectionHeading
          title="Featured Projects"
          subtitle="A selection of projects showcasing my skills across the stack."
        />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={filter === c}
                onClick={() => setFilter(c)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  filter === c
                    ? 'bg-primary text-white'
                    : 'bg-surface text-text-secondary border border-border hover:text-text-primary',
                )}
              >
                {c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              ref={searchRef}
              type="search"
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search projects..."
              aria-label="Search projects"
              className="w-full pl-10 pr-4 py-2 rounded-full bg-surface border border-border text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <svg
              className="mx-auto w-16 h-16 text-text-muted/40 mb-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
              <path d="M8 11h6" />
            </svg>
            <p className="text-text-muted text-lg">No projects match your criteria.</p>
            <button
              onClick={() => {
                setFilter('all');
                setSearch('');
                if (searchRef.current) searchRef.current.value = '';
              }}
              className="mt-4 text-primary hover:underline text-sm"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} featured={p.featured} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
