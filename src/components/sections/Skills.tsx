'use client';

import { useState, useMemo } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Pill } from '@/components/ui/Pill';
import { Reveal } from '@/components/animation/Reveal';
import { cn } from '@/lib/utils/cn';
import { skills, SKILL_CATEGORIES, SKILL_CATEGORY_COLORS } from '@/lib/data/skills';
import type { SkillCategory } from '@/lib/types/skill';

const ALL = 'all';

export function Skills() {
  const [cat, setCat] = useState<string>(ALL);

  const categories = useMemo(() => [ALL, ...Object.keys(SKILL_CATEGORIES)], []);

  const filtered = useMemo(
    () => (cat === ALL ? skills : skills.filter((s) => s.category === cat)),
    [cat]
  );

  const grouped = useMemo(() => {
    if (cat !== ALL) {
      return { [cat]: filtered };
    }
    return filtered.reduce<Record<string, typeof skills>>((acc, s) => {
      const c = s.category;
      if (!acc[c]) acc[c] = [];
      acc[c].push(s);
      return acc;
    }, {});
  }, [filtered, cat]);

  return (
    <section id="skills" className="py-24 md:py-32 bg-bg-alt/30" aria-label="Skills">
      <Container>
        <Reveal>
          <SectionHeading
            title="Skills & Technologies"
            subtitle="Technologies I work with, organized by domain."
          />
        </Reveal>

        <Reveal delay={0.15}>
          <div
            className="flex flex-wrap justify-center gap-2 mb-10"
            role="tablist"
            aria-label="Skill categories"
          >
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={cat === c}
                onClick={() => setCat(c)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  cat === c
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-surface text-text-secondary border border-border hover:text-text-primary hover:border-primary/30'
                )}
              >
                {c === ALL ? 'All' : SKILL_CATEGORIES[c as SkillCategory]}
              </button>
            ))}
          </div>
        </Reveal>

        {filtered.length === 0 ? (
          <p className="text-center text-text-muted py-12">
            No skills match the selected filter.
          </p>
        ) : (
          <Reveal delay={0.3} stagger={0.05} id="skills-grid">
            <div className="space-y-10">
              {Object.entries(grouped).map(([category, categorySkills]) => (
                <div key={category} className="reveal-stagger-skills-grid">
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                    {SKILL_CATEGORIES[category as SkillCategory]}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {categorySkills.map((s) => (
                      <Pill
                        key={s.name}
                        label={s.name}
                        level={s.level}
                        gradient={SKILL_CATEGORY_COLORS[s.category]}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
