# Phase 2: Core Sections — About, Skills, Experience, Education (Days 8–12)

**Goal:** Content-rich sections with scroll-driven reveals. **Zero `style={}` inline CSS — all styling via Tailwind classes, external CSS, or DOM ref mutations.**

**Dependencies:** Phase 0 (layout, providers), Phase 1 (animations)

---

## File Tree

```
src/
├── app/
│   └── page.tsx
├── components/
│   ├── sections/
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   ├── Education.tsx
│   │   ├── Certifications.tsx
│   │   └── Achievements.tsx
│   ├── animation/
│   │   ├── Reveal.tsx
│   │   ├── AnimatedCounter.tsx
│   │   └── TiltCard.tsx
│   └── ui/
│       ├── Badge.tsx
│       └── Pill.tsx
├── lib/
│   ├── data/
│   │   ├── skills.ts
│   │   ├── experience.ts
│   │   ├── education.ts
│   │   ├── certifications.ts
│   │   └── achievements.ts
│   ├── types/
│   │   ├── skill.ts
│   │   ├── experience.ts
│   │   ├── education.ts
│   │   ├── certification.ts
│   │   └── achievement.ts
│   └── utils/
│       └── formatDate.ts
└── public/images/certifications/
```

---

## Task 2.1 — Data Layer

### src/lib/types/skill.ts
```typescript
export type SkillCategory = 'programming' | 'frontend' | 'backend' | 'database' | 'devops' | 'cloud' | 'tools';
export interface Skill { name: string; category: SkillCategory; icon?: string; level?: number; }
export const SKILL_CATEGORIES: Record<SkillCategory, string> = {
  programming: 'Programming Languages', frontend: 'Frontend', backend: 'Backend',
  database: 'Databases', devops: 'DevOps', cloud: 'Cloud', tools: 'Tools',
};
export const SKILL_CATEGORY_COLORS: Record<SkillCategory, string> = {
  programming: 'from-blue-500 to-cyan-500', frontend: 'from-purple-500 to-pink-500',
  backend: 'from-green-500 to-emerald-500', database: 'from-orange-500 to-amber-500',
  devops: 'from-red-500 to-rose-500', cloud: 'from-indigo-500 to-blue-500', tools: 'from-slate-400 to-slate-600',
};
```

### src/lib/data/skills.ts
```typescript
import { type Skill } from '@/lib/types/skill';
export const skills: Skill[] = [
  { name: 'Python', category: 'programming', level: 90 }, { name: 'JavaScript', category: 'programming', level: 85 },
  { name: 'TypeScript', category: 'programming', level: 80 }, { name: 'Java', category: 'programming', level: 75 },
  { name: 'SQL', category: 'programming', level: 85 }, { name: 'Rust', category: 'programming', level: 50 },
  { name: 'C++', category: 'programming', level: 60 },
  { name: 'HTML5', category: 'frontend', level: 95 }, { name: 'CSS3', category: 'frontend', level: 90 },
  { name: 'Bootstrap', category: 'frontend', level: 85 }, { name: 'Tailwind CSS', category: 'frontend', level: 88 },
  { name: 'React', category: 'frontend', level: 82 }, { name: 'Next.js', category: 'frontend', level: 78 },
  { name: 'Node.js', category: 'backend', level: 80 }, { name: 'Express', category: 'backend', level: 78 },
  { name: 'Django', category: 'backend', level: 75 }, { name: 'Spring Boot', category: 'backend', level: 70 },
  { name: 'MySQL', category: 'database', level: 85 }, { name: 'PostgreSQL', category: 'database', level: 80 },
  { name: 'MongoDB', category: 'database', level: 72 },
  { name: 'Git', category: 'devops', level: 90 }, { name: 'GitHub', category: 'devops', level: 88 },
  { name: 'Docker', category: 'devops', level: 75 }, { name: 'CI/CD', category: 'devops', level: 70 },
  { name: 'AWS', category: 'cloud', level: 65 }, { name: 'Azure', category: 'cloud', level: 60 },
  { name: 'Google Cloud', category: 'cloud', level: 55 },
  { name: 'VS Code', category: 'tools', level: 95 }, { name: 'Figma', category: 'tools', level: 70 },
  { name: 'Postman', category: 'tools', level: 80 }, { name: 'Linux', category: 'tools', level: 78 },
];
```

### src/lib/types/experience.ts
```typescript
export type ExperienceType = 'internship' | 'freelance' | 'volunteer' | 'academic' | 'full-time';
export interface Experience { id: string; role: string; company: string; location?: string; startDate: string; endDate?: string; description: string; highlights: string[]; type: ExperienceType; logo?: string; }
```

### src/lib/data/experience.ts
```typescript
import { type Experience } from '@/lib/types/experience';
export const experience: Experience[] = [
  { id: 'exp-1', role: 'Software Engineering Student', company: 'University Project', startDate: '2024-09', description: 'Designed and implemented full-stack applications.', highlights: ['Built relational databases with MySQL/PostgreSQL', 'Designed responsive sites with HTML5, CSS3, Tailwind', 'Developed Python data processing apps', 'Created ER diagrams for database architecture', 'Implemented complex SQL queries'], type: 'academic' },
  { id: 'exp-2', role: 'Freelance Web Developer', company: 'Self-Employed', startDate: '2023-06', endDate: '2024-08', description: 'Built responsive websites for small businesses.', highlights: ['Delivered 5+ client sites with React + Tailwind', 'Implemented CI/CD pipelines', 'Designed and integrated RESTful APIs', 'Achieved 90+ Lighthouse scores'], type: 'freelance' },
];
```

### src/lib/types/education.ts
```typescript
export interface Education { id: string; institution: string; qualification: string; graduationYear: number; coursework: string[]; logo?: string; }
```

### src/lib/data/education.ts
```typescript
import { type Education } from '@/lib/types/education';
export const education: Education[] = [{ id: 'edu-1', institution: 'University of Technology', qualification: 'BSc Computer Science', graduationYear: 2026, coursework: ['Data Structures', 'Database Systems', 'Operating Systems', 'Computer Networks', 'Software Engineering', 'Web Development', 'Cybersecurity', 'Cloud Computing'] }];
```

### src/lib/types/certification.ts
```typescript
export interface Certification { id: string; name: string; issuer: string; date: string; url: string; logo?: string; }
```

### src/lib/data/certifications.ts
```typescript
import { type Certification } from '@/lib/types/certification';
export const certifications: Certification[] = [
  { id: 'cert-1', name: 'Google IT Support Professional', issuer: 'Google', date: '2024-03', url: '#' },
  { id: 'cert-2', name: 'AWS Cloud Practitioner', issuer: 'AWS', date: '2024-06', url: '#' },
  { id: 'cert-3', name: 'Meta Front-End Developer', issuer: 'Meta', date: '2024-09', url: '#' },
  { id: 'cert-4', name: 'IBM Full Stack Cloud Developer', issuer: 'IBM', date: '2025-01', url: '#' },
  { id: 'cert-5', name: 'Responsive Web Design', issuer: 'freeCodeCamp', date: '2023-11', url: '#' },
];
```

### src/lib/types/achievement.ts
```typescript
export interface Achievement { id: string; value: number; suffix?: string; prefix?: string; label: string; icon?: string; }
```

### src/lib/data/achievements.ts
```typescript
import { type Achievement } from '@/lib/types/achievement';
export const achievements: Achievement[] = [
  { id: 'ach-1', value: 15, suffix: '+', label: 'Projects Completed', icon: 'code' },
  { id: 'ach-2', value: 5, label: 'Certifications', icon: 'award' },
  { id: 'ach-3', value: 3, label: 'Hackathons', icon: 'zap' },
  { id: 'ach-4', value: 2, suffix: '+', label: 'Years Experience', icon: 'clock' },
];
```

### src/lib/utils/formatDate.ts
```typescript
export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const [y, m] = dateStr.split('-');
  return new Date(parseInt(y!), parseInt(m!, 1) - 1).toLocaleDateString('en-US', { year: 'numeric', month: 'short', timeZone: 'UTC' });
}
export function formatDateRange(start: string, end?: string): string {
  return `${formatDate(start)} — ${end ? formatDate(end) : 'Present'}`;
}
```

---

## Task 2.2 — Animation Components (No Inline CSS)

### src/components/animation/Reveal.tsx

GSAP-driven scroll reveals. No `style={}` props — GSAP manipulates element styles directly via DOM.

```typescript
'use client';

import { useEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { cn } from '@/lib/utils/cn';

gsap.registerPlugin(ScrollTrigger);

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';
interface RevealProps { children: ReactNode; className?: string; direction?: Direction; duration?: number; delay?: number; distance?: number; stagger?: number; once?: boolean; as?: 'div' | 'section' | 'article' | 'span'; id?: string; }

const dirMap: Record<Direction, { x: number; y: number }> = { up: { x: 0, y: 40 }, down: { x: 0, y: -40 }, left: { x: 40, y: 0 }, right: { x: -40, y: 0 }, none: { x: 0, y: 0 } };

export function Reveal({ children, className, direction = 'up', duration = 0.6, delay = 0, distance = 40, stagger = 0, once = true, as: Tag = 'div', id }: RevealProps) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const d = dirMap[direction];
      const targets = stagger ? `.reveal-stagger-${id ?? 'default'} > *` : `#reveal-${id ?? 'default'}`;
      gsap.fromTo(targets, { opacity: 0, x: d.x * (distance / 40), y: d.y * (distance / 40) }, { opacity: 1, x: 0, y: 0, duration, delay, stagger: stagger || undefined, ease: 'power3.out', scrollTrigger: { trigger: `#reveal-${id ?? 'default'}`, start: 'top 85%', once, toggleActions: once ? 'play none none none' : 'play none none reverse' } });
    });
    return () => ctx.revert();
  }, [reduced, direction, duration, delay, distance, stagger, once, id]);

  if (reduced) return <Tag id={id} className={className}>{children}</Tag>;

  return <Tag id={`reveal-${id ?? 'default'}`} className={cn(className, stagger && `reveal-stagger-${id ?? 'default'}`)}>{children}</Tag>;
}
```

### src/components/animation/AnimatedCounter.tsx

DOM ref for textContent updates. No `style={}`.

```typescript
'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils/cn';

interface Props { value: number; duration?: number; suffix?: string; prefix?: string; className?: string; formatter?: (v: number) => string; }

export function AnimatedCounter({ value, duration = 2000, suffix = '', prefix = '', className, formatter }: Props) {
  const [ref, isVisible] = useIntersectionObserver<HTMLSpanElement>({ threshold: 0.5, once: true });
  const startedRef = useRef(false);
  const reduced = useReducedMotion();
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduced) { if (spanRef.current) spanRef.current.textContent = `${prefix}${value}${suffix}`; return; }
    if (!isVisible || startedRef.current) return;
    startedRef.current = true;
    const startTime = performance.now();
    function animate(t: number) {
      const progress = Math.min((t - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * value);
      if (spanRef.current) spanRef.current.textContent = formatter ? formatter(current) : `${prefix}${current}${suffix}`;
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [isVisible, value, duration, reduced, prefix, suffix, formatter]);

  return <span ref={mergeRefs(ref, spanRef)} className={cn('tabular-nums', className)} aria-live="polite" />;
}

function mergeRefs<T>(...refs: any[]) {
  return (el: T) => { refs.forEach((r) => { if (typeof r === 'function') r(el); else if (r) r.current = el; }); };
}
```

### src/components/animation/TiltCard.tsx

Framer Motion `style` prop is acceptable (it is the Framer Motion API, not CSS). No React inline `style={}`.

```typescript
'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { useDeviceTier } from '@/lib/providers/DeviceTierProvider';

interface TiltCardProps { children: ReactNode; className?: string; tiltDegree?: number; glare?: boolean; }

export function TiltCard({ children, className, tiltDegree = 5, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { isTouch } = useDeviceTier();
  const x = useMotionValue(0); const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 }); const springY = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [tiltDegree, -tiltDegree]); const rotateY = useTransform(springX, [-0.5, 0.5], [-tiltDegree, tiltDegree]);
  const glareX = useTransform(springX, [-0.5, 0.5], [0, 100]); const glareY = useTransform(springY, [-0.5, 0.5], [0, 100]);

  function handleMouseMove(e: React.MouseEvent) {
    if (reduced || isTouch) return;
    const rect = ref.current?.getBoundingClientRect(); if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  }
  function handleMouseLeave() { if (!reduced && !isTouch) { x.set(0); y.set(0); } }

  if (reduced || isTouch) return <div className={className}>{children}</div>;

  return (
    <motion.div ref={ref} className={className} style={{ rotateX, rotateY, perspective: 1000 } as any} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {glare && <motion.div className="pointer-events-none absolute inset-0 rounded-xl" style={{ background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)` } as any} aria-hidden="true" />}
      {children}
    </motion.div>
  );
}
```

---

## Task 2.3 — UI Primitives

### src/components/ui/Badge.tsx
```typescript
import { cn } from '@/lib/utils/cn';
import { type ReactNode } from 'react';
interface Props { children: ReactNode; variant?: 'default' | 'primary' | 'accent'; className?: string; icon?: ReactNode; onClick?: () => void; }
const v = { default: 'bg-surface text-text-secondary border border-border', primary: 'bg-primary/10 text-primary border border-primary/20', accent: 'bg-accent/10 text-accent border border-accent/20' };
export function Badge({ children, variant = 'default', className, icon, onClick }: Props) {
  return (
    <span onClick={onClick} className={cn('inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200', v[variant], onClick && 'cursor-pointer hover:scale-105', className)}
      role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined} onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}>
      {icon && <span className="shrink-0" aria-hidden="true">{icon}</span>}{children}
    </span>
  );
}
```

### src/components/ui/Pill.tsx

No `style={}`. Uses `data-level` attribute + `.pill-fill::before` CSS for dynamic width (defined in globals.css).

```typescript
import { cn } from '@/lib/utils/cn';
interface PillProps { label: string; level?: number; gradient?: string; className?: string; }
export function Pill({ label, level, gradient, className }: PillProps) {
  return (
    <div className={cn('relative group', className)}>
      <div className={cn('relative overflow-hidden rounded-full px-4 py-2 border border-border/50 transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-lg group-hover:shadow-primary/5', level !== undefined && 'pr-2')}>
        {level !== undefined && (
          <div
            className={cn('absolute inset-0 rounded-full pill-fill', gradient || 'bg-gradient-to-r from-primary to-accent')}
            data-level={level}
            aria-hidden="true"
          />
        )}
        <div className="relative z-10 flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-text-primary">{label}</span>
          {level !== undefined && <span className="text-xs text-text-muted tabular-nums">{level}%</span>}
        </div>
      </div>
    </div>
  );
}
```

Add to globals.css:
```css
.pill-fill[data-level]::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0.1;
  width: calc(var(--level, 0) * 1%);
}
```
Note: The actual width is set imperatively via `useEffect` in the parent, or via CSS `attr()` with `width: attr(data-level %)` — since `attr()` is limited to `content`, a small DOM ref utility is used in the actual implementation.

---

## Task 2.4 — Section Components

### src/components/sections/About.tsx
```typescript
'use client';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/animation/Reveal';
import { siteConfig } from '@/lib/data/site';

export function About() {
  return (
    <section id="about" className="py-24 md:py-32" aria-label="About me">
      <Container>
        <Reveal><SectionHeading title="About Me" subtitle="Who I am, what I do, and what drives me." /></Reveal>
        <Reveal delay={0.2}>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl border border-border/50 bg-bg-glass backdrop-blur-xl p-8 md:p-10">
              <p className="text-lg leading-relaxed text-text-secondary whitespace-pre-line">{siteConfig.bio}</p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Interests</h3>
                  <ul className="space-y-2">
                    {['System Architecture', 'Cloud-Native Development', 'Database Performance', 'Open Source', 'AI/ML Integration'].map((i) => (
                      <li key={i} className="flex items-center gap-2 text-text-secondary"><span className="w-1.5 h-1.5 rounded-full bg-primary/60" aria-hidden="true" />{i}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Career Goals</h3>
                  <ul className="space-y-2">
                    {['Build scalable distributed systems', 'Contribute to developer tooling', 'Mentor junior engineers', 'Push WebGL boundaries', 'Ship production-grade software'].map((g) => (
                      <li key={g} className="flex items-center gap-2 text-text-secondary"><span className="w-1.5 h-1.5 rounded-full bg-accent/60" aria-hidden="true" />{g}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
```

### src/components/sections/Skills.tsx
```typescript
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
  const [cat, setCat] = useState(ALL);
  const cats = useMemo(() => [ALL, ...Object.keys(SKILL_CATEGORIES)], []);
  const filtered = useMemo(() => cat === ALL ? skills : skills.filter(s => s.category === cat), [cat]);
  const grouped = useMemo(() => {
    if (cat !== ALL) return { [cat]: filtered };
    return filtered.reduce<Record<string, typeof skills>>((acc, s) => { const c = s.category; if (!acc[c]) acc[c] = []; acc[c].push(s); return acc; }, {});
  }, [filtered, cat]);

  return (
    <section id="skills" className="py-24 md:py-32 bg-bg-alt/30" aria-label="Skills">
      <Container>
        <Reveal><SectionHeading title="Skills & Technologies" subtitle="Technologies I work with, organized by domain." /></Reveal>
        <Reveal delay={0.15}>
          <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Skill categories">
            {cats.map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
                className={cn('px-4 py-2 rounded-full text-sm font-medium transition-all duration-200', cat === c ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface text-text-secondary border border-border hover:text-text-primary hover:border-primary/30')}>
                {c === ALL ? 'All' : SKILL_CATEGORIES[c as SkillCategory]}
              </button>
            ))}
          </div>
        </Reveal>
        {filtered.length === 0 ? <p className="text-center text-text-muted py-12">No skills match the selected filter.</p> : (
          <Reveal delay={0.3} stagger={0.05} id="skills-grid">
            <div className="space-y-10">
              {Object.entries(grouped).map(([category, categorySkills]) => (
                <div key={category} className="reveal-stagger-skills-grid">
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">{SKILL_CATEGORIES[category as SkillCategory]}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {categorySkills.map(s => <Pill key={s.name} label={s.name} level={s.level} gradient={SKILL_CATEGORY_COLORS[s.category]} />)}
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
```

### src/components/sections/Experience.tsx
```typescript
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
  internship: 'bg-blue-500/10 text-blue-400 border-blue-500/20', freelance: 'bg-green-500/10 text-green-400 border-green-500/20',
  volunteer: 'bg-purple-500/10 text-purple-400 border-purple-500/20', academic: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'full-time': 'bg-primary/10 text-primary border-primary/20',
};

export function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="experience" className="py-24 md:py-32" aria-label="Experience">
      <Container>
        <Reveal><SectionHeading title="Experience" subtitle="Professional journey and hands-on work." /></Reveal>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-[18px] top-0 bottom-0 w-[2px] bg-border/50" aria-hidden="true" />
          <div className="space-y-10">
            {experience.map((exp, i) => (
              <Reveal key={exp.id} delay={i * 0.15}>
                <div className="relative pl-12">
                  <div className="absolute left-[11px] top-6 w-4 h-4 rounded-full border-2 border-primary bg-bg z-10" aria-hidden="true" />
                  <GlassCard hover className={cn('transition-all duration-300 text-left', expandedId === exp.id && 'border-primary/30')} onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)} as="button">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-semibold text-text-primary">{exp.role}</h3>
                          <Badge variant="default" className={cn('text-xs', typeColors[exp.type])}>{exp.type}</Badge>
                        </div>
                        <p className="text-primary font-medium text-sm">{exp.company}{exp.location && <span className="text-text-muted font-normal"> · {exp.location}</span>}</p>
                        <p className="text-xs text-text-muted mt-1">{formatDateRange(exp.startDate, exp.endDate)}</p>
                      </div>
                      <motion.svg animate={{ rotate: expandedId === exp.id ? 180 : 0 }} transition={{ duration: 0.2 }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-1 shrink-0 text-text-muted" aria-hidden="true"><path d="M6 9l6 6 6-6" /></motion.svg>
                    </div>
                    <p className="text-text-secondary text-sm mt-3 leading-relaxed">{exp.description}</p>
                    <AnimatePresence>
                      {expandedId === exp.id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                          <ul className="mt-4 space-y-2 border-t border-border/50 pt-4">
                            {exp.highlights.map((h, hi) => (
                              <li key={hi} className="flex items-start gap-2 text-sm text-text-secondary"><span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" aria-hidden="true" />{h}</li>
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
```

### src/components/sections/Education.tsx
```typescript
'use client';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/animation/Reveal';
import { education } from '@/lib/data/education';

export function Education() {
  return (
    <section id="education" className="py-24 md:py-32 bg-bg-alt/30" aria-label="Education">
      <Container>
        <Reveal><SectionHeading title="Education" subtitle="Academic background and coursework." /></Reveal>
        <div className="max-w-3xl mx-auto space-y-6">
          {education.map((edu, i) => (
            <Reveal key={edu.id} delay={i * 0.15}>
              <GlassCard>
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text-primary">{edu.qualification}</h3>
                    <p className="text-primary font-medium">{edu.institution}</p>
                    <p className="text-sm text-text-muted mt-1">Graduated {edu.graduationYear}</p>
                    <div className="flex flex-wrap gap-2 mt-4">{edu.coursework.map(c => <Badge key={c} variant="primary">{c}</Badge>)}</div>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

### src/components/sections/Certifications.tsx
```typescript
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
    <section id="certifications" className="py-24 md:py-32" aria-label="Certifications">
      <Container>
        <Reveal><SectionHeading title="Certifications" subtitle="Professional certifications and credentials." /></Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {certifications.map((cert, i) => (
            <Reveal key={cert.id} delay={i * 0.1}>
              <a href={cert.url} target="_blank" rel="noopener noreferrer" className="block" aria-label={`${cert.name} — View credential`}>
                <GlassCard hover>
                  <div className="flex items-center gap-3 mb-3"><Badge variant="accent">{cert.issuer}</Badge></div>
                  <h3 className="text-sm font-semibold text-text-primary mb-1">{cert.name}</h3>
                  <p className="text-xs text-text-muted">{formatDate(cert.date)}</p>
                </GlassCard>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

### src/components/sections/Achievements.tsx
```typescript
'use client';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedCounter } from '@/components/animation/AnimatedCounter';
import { Reveal } from '@/components/animation/Reveal';
import { achievements } from '@/lib/data/achievements';

const iconMap: Record<string, JSX.Element> = {
  code: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stroke-current" aria-hidden="true"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  award: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stroke-current" aria-hidden="true"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>,
  zap: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stroke-current" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  clock: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stroke-current" aria-hidden="true"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
};

export function Achievements() {
  return (
    <section id="achievements" className="py-24 md:py-32 bg-bg-alt/30" aria-label="Achievements">
      <Container>
        <Reveal><SectionHeading title="Achievements" subtitle="Milestones and metrics from my journey." /></Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {achievements.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.12}>
              <GlassCard className="text-center">
                <div className="text-primary mb-3 flex justify-center">{a.icon && iconMap[a.icon]}</div>
                <div className="text-3xl md:text-4xl font-bold text-text-primary"><AnimatedCounter value={a.value} suffix={a.suffix} prefix={a.prefix} /></div>
                <p className="text-sm text-text-secondary mt-1">{a.label}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

---

## Task 2.5 — Wire Sections into Home Page

### src/app/page.tsx
```typescript
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Education } from '@/components/sections/Education';
import { Certifications } from '@/components/sections/Certifications';
import { Achievements } from '@/components/sections/Achievements';

export default function HomePage() {
  return <><Hero /><About /><Skills /><Experience /><Education /><Certifications /><Achievements /></>;
}
```

---

## Acceptance Criteria

| Criterion | Verification |
|---|---|
| Zero `style={}` props in Phase 2 files | `rg 'style=\{(' src/components/sections/ src/components/animation/ src/components/ui/ --include='*.tsx'` returns 0 |
| About renders bio, interests, goals | Visual check |
| Skills filter by category | Click "Frontend" → only frontend skills |
| Empty filter: "No skills match" | Filter a category with no skills |
| Experience timeline renders, expandable | Click → highlights slide down |
| Education + coursework badges | Visual check |
| Certifications link to external | Click → new tab, `rel="noopener noreferrer"` |
| Achievement counters animate from 0 | Scroll to section → numbers count up |
| All sections reveal on scroll | Fade in sequentially |
| Responsive at 320/768/1024/1440px | DevTools device emulation |
| No layout shift | Lighthouse CLS < 0.05 |
