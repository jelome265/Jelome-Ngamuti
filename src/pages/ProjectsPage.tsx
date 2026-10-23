import { PageIntro } from "../components/ui/PageIntro";
import { PictureSlot } from "../components/ui/PictureSlot";
import { ProjectEntry } from "../components/ui/ProjectEntry";
import { projects } from "../data/projects";

export function ProjectsPage() {
  return (
    <section aria-labelledby="projects-heading" className="mx-auto max-w-[1280px] px-[32px] pt-[120px] pb-[120px] max-md:px-[18px] max-md:pt-16">
      <PageIntro id="projects-heading" title="Projects">
        Three projects in Rust, Java and Python. Each one links to its repository and shows the latest commit read from it.
      </PageIntro>

      <div className="mt-[120px] grid grid-cols-12 gap-x-6 gap-y-[120px] max-md:grid-cols-1">
        {projects.map((project, index) => (
          <div key={project.id} id={project.id} className="col-span-full grid grid-cols-12 gap-x-6 scroll-mt-8 max-md:grid-cols-1">
            <ProjectEntry project={project} textSide={index % 2 === 0 ? "right" : "left"} />
            {!project.preview && (
              <div className={index % 2 === 0 ? "col-span-6 col-start-1 max-md:col-span-full" : "col-span-6 col-start-7 max-md:col-span-full"}>
                <PictureSlot label={project.name} ratio="4/5" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
