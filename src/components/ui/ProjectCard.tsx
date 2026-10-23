import type { Project } from "../../types/portfolio";

interface ProjectCardProps {
  readonly project: Project;
  readonly index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="flex flex-col border border-border border-t-foreground bg-surface p-6">
      <div className="flex items-center justify-between font-mono text-xs text-muted">
        <span>{String(index).padStart(2, "0")}</span>
        <span>{project.status}</span>
      </div>

      {project.preview && (
        <img
          src={project.preview.src}
          alt={project.preview.alt}
          width={529}
          height={478}
          loading="lazy"
          className="mt-4 h-auto w-full border border-border"
        />
      )}

      <h3 className="mt-4 font-display text-xl font-semibold">{project.name}</h3>
      <p className="mt-2">{project.summary}</p>
      <p className="mt-3 text-muted">{project.contribution}</p>
      {project.note && <p className="mt-3 text-sm text-muted">{project.note}</p>}

      <ul className="mt-4 flex flex-wrap gap-2 font-mono text-xs text-muted">
        {project.technologies.map((technology) => (
          <li key={technology} className="border border-border px-2 py-0.5">
            {technology}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline-offset-4 hover:text-accent-hover hover:underline"
        >
          {project.name} source<span className="sr-only"> (opens in a new tab)</span>
        </a>
        {project.demo && (
          <a
            href={project.demo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-4 hover:text-accent-hover hover:underline"
          >
            {project.name} {project.demo.label.toLowerCase()}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  );
}
