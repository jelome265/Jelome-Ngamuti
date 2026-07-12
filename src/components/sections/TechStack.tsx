'use client';

import { useState, useMemo } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Pill } from '@/components/ui/Pill';
import { Reveal } from '@/components/animation/Reveal';
import { cn } from '@/lib/utils/cn';
import { skills, skillCategories } from '@/lib/data/skills';

type CategoryId = (typeof skillCategories)[number]['id'];

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return skills;
    return skills.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="tech-stack" className="py-24 md:py-32" aria-label="Technology stack">
      <Container>
        <Reveal>
          <SectionHeading
            title="Tech Stack"
            subtitle="All technologies I work with at a glance."
          />
        </Reveal>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Skill categories">
          <button
            role="tab"
            aria-selected={activeCategory === 'all'}
            onClick={() => setActiveCategory('all')}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
              activeCategory === 'all'
                ? 'bg-primary text-white'
                : 'bg-surface text-text-secondary border border-border hover:text-text-primary',
            )}
          >
            All
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                activeCategory === cat.id
                  ? 'bg-primary text-white'
                  : 'bg-surface text-text-secondary border border-border hover:text-text-primary',
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto w-12 h-12 text-text-muted/40 mb-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <p className="text-text-muted text-lg">No skills found in this category.</p>
            <button
              onClick={() => setActiveCategory('all')}
              className="mt-4 text-primary hover:underline text-sm"
            >
              Show all skills
            </button>
          </div>
        ) : (
          <Reveal delay={0.2} stagger={0.03} id="tech-grid">
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {filtered.map((s) => (
                <Pill key={s.name} label={s.name} level={s.level} />
              ))}
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
