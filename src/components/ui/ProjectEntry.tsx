import type { Project } from "../../types/portfolio";
import { LatestCommit } from "./LatestCommit";

interface ProjectEntryProps {
  readonly project: Project;
  // Where the text sits on desktop: the picture (if any) takes the other side.
  readonly textSide: "left" | "right";
}

// One project as a composition. Desktop uses a 12-column grid; phones stack in a single column.
export function ProjectEntry({ project, textSide }: ProjectEntryProps) {
  const textColumn =
    textSide === "right"
      ? "col-span-5 col-start-8 max-md:col-span-full max-md:col-start-auto"
      : "col-span-5 col-start-1 max-md:col-span-full max-md:col-start-auto";

  const text = (
    <div className="reveal flex flex-col gap-5">
      <h3 className="text-[40px] leading-[1.05] font-bold tracking-[-0.02em]">{project.name}</h3>
      <p className="text-[24px] leading-[1.3]">{project.summary}</p>
      <p>{project.contribution}</p>
      {project.note && <p className="text-muted">{project.note}</p>}
      <p className="text-[15px] text-muted">
        {project.status} · {project.technologies.join(", ")}
      </p>
      <LatestCommit repoUrl={project.repoUrl} />
      <ul className="reveal flex flex-wrap gap-x-8 gap-y-2 text-[15px]">
        <li>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center underline underline-offset-4 decoration-1 hover:text-accent"
          >
            Source<span className="sr-only"> for {project.name} (opens in a new tab)</span>
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
              {project.demo.label}
              <span className="sr-only"> for {project.name} (opens in a new tab)</span>
            </a>
          </li>
        )}
      </ul>
    </div>
  );

  if (!project.preview) {
    return <div className={textColumn}>{text}</div>;
  }

  return (
    <>
      <figure className="reveal col-span-7 col-start-1 max-md:col-span-full max-md:col-start-auto">
        <div data-ui className="work-picture">
          <img src={project.preview.src} alt={project.preview.alt} width={529} height={478} className="h-auto w-full" />
        </div>
        <figcaption className="mt-3 text-[15px] text-muted">{project.name}, as its owner captured it.</figcaption>
        {project.fragments && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            {project.fragments.map((fragment) => (
              <img key={fragment.src} src={fragment.src} alt={fragment.alt} className="h-auto w-full" />
            ))}
          </div>
        )}
      </figure>
      <div className="col-span-4 col-start-9 self-end max-md:col-span-full max-md:col-start-auto">{text}</div>
    </>
  );
}
