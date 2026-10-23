import { ProjectEntry } from "../components/ui/ProjectEntry";
import { projects } from "../data/projects";

// Each entry takes a different place in the grid, so the page has movement without ornament.
export function SelectedProjects() {
  return (
    <section id="projects" aria-labelledby="work-heading" className="scroll-mt-6 px-[24px] pt-[160px] pb-[120px]">
      <div className="reveal text-[clamp(3rem,12.4vw,11rem)] leading-[0.9] tracking-[-0.02em]">
        <h2 id="work-heading" className="inline font-bold">
          Work:
        </h2>{" "}
        {projects.map((project, index) => (
          <span key={project.id}>
            <a
              href={`#${project.id}`}
              className="underline-offset-[0.12em] decoration-2 hover:text-accent hover:underline"
            >
              {project.name}
            </a>
            {index < projects.length - 1 ? ", " : "."}
          </span>
        ))}
      </div>

      <div className="mt-[120px] grid gap-y-[120px] md:grid-cols-12 md:gap-x-6">
        {projects.map((project, index) => (
          <div key={project.id} id={project.id} className="contents scroll-mt-6">
            <ProjectEntry
              project={project}
              side={project.preview ? "picture-left" : index % 2 === 0 ? "text-right" : "text-left"}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
