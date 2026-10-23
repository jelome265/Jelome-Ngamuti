import { Fragment } from "react";
import { Link } from "react-router";
import { projects } from "../../data/projects";

// The home page's list of work: one statement, each name a link to its entry on the Projects page.
export function WorkStatement() {
  return (
    <section aria-labelledby="work-heading">
      <p className="text-[40px] leading-[1.15] tracking-[-0.01em]">
        <span id="work-heading" className="font-bold">
          Work:
        </span>{" "}
        {projects.map((project, index) => (
          <Fragment key={project.id}>
            <span className="reveal inline-block whitespace-nowrap">
              <Link to={`/projects#${project.id}`} className="hover:text-accent">
                {project.name}
              </Link>
            </span>
            {index < projects.length - 1 ? ", " : "."}
          </Fragment>
        ))}
      </p>
    </section>
  );
}
