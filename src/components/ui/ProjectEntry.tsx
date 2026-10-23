import type { PreviewImage, Project } from "../../types/portfolio";
import { LatestCommit } from "./LatestCommit";

interface ProjectEntryProps {
  readonly project: Project;
  // Text alternates sides on desktop; each entry keeps a balanced image-and-copy composition.
  readonly textSide: "left" | "right";
}

function ImageCaption({
  image,
  fallback,
}: {
  readonly image: PreviewImage;
  readonly fallback: string;
}) {
  return (
    <figcaption className="mt-3 text-[15px] leading-[1.45] text-muted">
      <span className="block">{image.caption ?? fallback}</span>
      {image.credit && (
        <span className="block text-[13px]">
          Photograph by{" "}
          <a
            href={image.credit.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-accent"
          >
            {image.credit.label}
          </a>
          {image.credit.licenseLabel && image.credit.licenseHref && (
            <>
              {" · "}
              <a
                href={image.credit.licenseHref}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-accent"
              >
                {image.credit.licenseLabel}
              </a>
            </>
          )}
        </span>
      )}
    </figcaption>
  );
}

function InterfaceImage({ image, fallback }: { readonly image: PreviewImage; readonly fallback: string }) {
  return (
    <figure className="m-0 min-w-0">
      <div data-ui className="work-picture overflow-hidden">
        <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="h-auto w-full" />
      </div>
      <ImageCaption image={image} fallback={fallback} />
    </figure>
  );
}

function ContextImage({ image }: { readonly image: PreviewImage }) {
  return (
    <figure className="reveal m-0 min-w-0">
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        width={960}
        height={671}
        className="aspect-[4/3] w-full object-cover"
      />
      <ImageCaption image={image} fallback="Lilongwe, Malawi." />
    </figure>
  );
}

// One project as a composition. Desktop pairs evidence with its explanation; phones stack the same content.
export function ProjectEntry({ project, textSide }: ProjectEntryProps) {
  const textColumn =
    textSide === "right"
      ? "col-span-5 col-start-8 max-md:col-span-full max-md:col-start-auto"
      : "col-span-5 col-start-1 max-md:col-span-full max-md:col-start-auto";
  const imageColumn =
    textSide === "right"
      ? "col-span-7 col-start-1 max-md:col-span-full max-md:col-start-auto"
      : "col-span-7 col-start-6 max-md:col-span-full max-md:col-start-auto";

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

  if (project.preview) {
    return (
      <>
        <figure className={`reveal m-0 min-w-0 ${imageColumn}`}>
          <InterfaceImage image={project.preview} fallback={`${project.name} project image.`} />
          {project.fragments && project.fragments.length > 0 && (
            <div className="mt-6 grid grid-cols-2 items-start gap-4 max-md:grid-cols-1">
              {project.fragments.map((fragment) => (
                <InterfaceImage key={fragment.src} image={fragment} fallback={`${project.name} interface detail.`} />
              ))}
            </div>
          )}
        </figure>
        <div className={`self-end ${textColumn}`}>{text}</div>
      </>
    );
  }

  if (project.contextPhotos && project.contextPhotos.length > 0) {
    return (
      <>
        <div className={`grid grid-cols-2 items-start gap-4 max-md:grid-cols-1 ${imageColumn}`}>
          {project.contextPhotos.map((image) => (
            <ContextImage key={image.src} image={image} />
          ))}
        </div>
        <div className={`self-end ${textColumn}`}>{text}</div>
      </>
    );
  }

  return <div className={textColumn}>{text}</div>;
}
