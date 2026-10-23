import { ProjectCard } from "../components/ui/ProjectCard";
import { projects } from "../data/projects";

export function SelectedProjects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-8 border-t border-border"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-12 md:py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">01 · Projects</p>
        <h2 id="projects-heading" className="mt-3 font-display text-[clamp(1.8rem,4vw,2.75rem)] font-semibold">
          Selected projects
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <div key={project.id} className={project.featured ? "md:col-span-2" : undefined}>
              <ProjectCard project={project} index={index + 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
