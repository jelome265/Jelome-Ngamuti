import type { Project } from "../../types/portfolio";
import { LatestCommit } from "./LatestCommit";

type Side = "text-right" | "picture-left" | "text-left";

interface ProjectEntryProps {
  readonly project: Project;
  readonly side: Side;
}

// One project as a full composition: no card, no border; the picture (when there is one) is large.
export function ProjectEntry({ project, side }: ProjectEntryProps) {
  const text = (
    <div className="reveal flex flex-col gap-5 text-[18px]">
      <h3 className="text-[40px] leading-[1.05] font-bold tracking-[-0.02em]">{project.name}</h3>
      <p className="text-[24px] leading-[1.3]">{project.summary}</p>
      <p>{project.contribution}</p>
      <p className="text-muted">Status: {project.status}.</p>
      {project.note && <p className="text-muted">{project.note}</p>}
      <p>
        <span className="text-muted">Built with </span>
        {project.technologies.join(", ")}
      </p>
      <LatestCommit repoUrl={project.repoUrl} />
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        <li>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center underline underline-offset-4 decoration-1 hover:text-accent"
          >
            {project.name} source<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
        {project.demo && (
          <li>
            <a
              href={project.demo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center underline underline-offset-4 decoration-1 hover:text-accent"
            >
              {project.name} {project.demo.label.toLowerCase()}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        )}
      </ul>
    </div>
  );

  if (!project.preview) {
    return (
      <div
        className={
          side === "text-left" ? "md:col-span-6 md:col-start-1" : "md:col-span-6 md:col-start-7"
        }
      >
        {text}
      </div>
    );
  }

  return (
    <>
      <figure className="reveal md:col-span-7 md:col-start-1">
        <div data-ui className="work-picture">
          <img
            src={project.preview.src}
            alt={project.preview.alt}
            width={529}
            height={478}
            className="h-auto w-full"
          />
        </div>
        <figcaption className="mt-3 text-[15px] text-muted">
          {project.name}, the interface as its owner captured it.
        </figcaption>
        {project.fragments && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            {project.fragments.map((fragment) => (
              <img
                key={fragment.src}
                src={fragment.src}
                alt={fragment.alt}
                className="h-auto w-full"
              />
            ))}
          </div>
        )}
      </figure>
      <div className="md:col-span-4 md:col-start-9 md:self-end">{text}</div>
    </>
  );
}
