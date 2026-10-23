import type { Project } from "../../types/portfolio";

interface ProjectCardProps {
  readonly project: Project;
  readonly index: number;
}

const linkClass = "inline-flex min-h-11 items-center text-accent underline underline-offset-4 decoration-1 hover:text-accent-hover";

export function ProjectCard({ project, index }: ProjectCardProps) {
  const featured = project.featured === true && project.preview !== undefined;

  return (
    <article
      className={
        featured
          ? "border border-border border-t-foreground bg-surface p-6 md:grid md:grid-cols-12 md:gap-10 md:p-10"
          : "flex flex-col border border-border border-t-foreground bg-surface p-6"
      }
    >
      {project.preview && (
        <img
          src={project.preview.src}
          alt={project.preview.alt}
          width={529}
          height={478}
          loading="lazy"
          className={
            featured
              ? "order-first h-auto w-full border border-border md:order-none md:col-span-7"
              : "mt-4 h-auto w-full border border-border"
          }
        />
      )}

      <div className={featured ? "flex flex-col md:col-span-5" : "flex flex-1 flex-col"}>
        <div className="mt-4 flex items-center justify-between font-mono text-xs text-muted md:mt-0">
          <span>{String(index).padStart(2, "0")}</span>
          <span>{project.status}</span>
        </div>

        <h3
          className={
            featured
              ? "mt-4 font-display text-3xl font-semibold"
              : "mt-4 font-display text-xl font-semibold"
          }
        >
          {project.name}
        </h3>
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
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {project.name} source<span className="sr-only"> (opens in a new tab)</span>
          </a>
          {project.demo && (
            <a href={project.demo.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {project.name} {project.demo.label.toLowerCase()}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
