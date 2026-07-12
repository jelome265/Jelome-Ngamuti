'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { TiltCard } from '@/components/animation/TiltCard';
import { Reveal } from '@/components/animation/Reveal';
import { cn } from '@/lib/utils/cn';
import type { Project } from '@/lib/types/project';

interface ProjectCardProps {
  project: Project;
  index?: number;
  featured?: boolean;
}

export function ProjectCard({ project, index = 0, featured = false }: ProjectCardProps) {
  return (
    <Reveal delay={index * 0.1}>
      <TiltCard className={cn('group h-full', featured && 'lg:col-span-2')}>
        <Link
          href={`/projects/${project.slug}`}
          className="block h-full"
          aria-label={`View ${project.title} case study`}
        >
          <div
            className={cn(
              'relative overflow-hidden rounded-xl border border-border/50 bg-bg-glass backdrop-blur-xl transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-lg group-hover:shadow-primary/5 h-full',
            )}
          >
            <div className="aspect-video bg-surface relative overflow-hidden">
              <img
                src={project.thumbnail}
                alt={`${project.title} screenshot`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="primary">{project.category}</Badge>
                {project.featured && <Badge variant="accent">Featured</Badge>}
              </div>
              <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-text-secondary mt-2 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {project.technologies.slice(0, 4).map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
                {project.technologies.length > 4 && (
                  <Badge>+{project.technologies.length - 4}</Badge>
                )}
              </div>
            </div>
          </div>
        </Link>
      </TiltCard>
    </Reveal>
  );
}
