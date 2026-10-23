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
        <p className="font-mono text-xs uppercase tracking-widest text-accent">01 · Projects</p>
        <h2 id="projects-heading" className="mt-3 font-display text-[clamp(1.8rem,4vw,2.75rem)] font-semibold">
          Selected projects
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
