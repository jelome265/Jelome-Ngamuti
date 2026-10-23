import { Fragment } from "react";
import type { PreviewImage, Project } from "../../types/portfolio";
import { LatestCommit } from "./LatestCommit";
import { ProjectShowcase } from "./ProjectShowcase";

interface ProjectEntryProps {
  readonly project: Project;
  // Text alternates sides on desktop; each entry keeps a balanced image-and-copy composition.
  readonly textSide: "left" | "right";
}

function ImageCaption({ image }: { readonly image: PreviewImage }) {
  if (!image.caption && !image.credit) return null;

  return (
    <figcaption className="mt-3 text-[15px] leading-[1.45] text-muted">
      {image.caption && <span className="block">{image.caption}</span>}
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

function InterfaceImage({ image }: { readonly image: PreviewImage }) {
  return (
    <figure className="m-0 min-w-0">
      <div data-ui className="work-picture overflow-hidden">
        <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="h-auto w-full" />
      </div>
      <ImageCaption image={image} />
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
        height={720}
        className="aspect-[4/3] w-full object-cover"
      />
    </figure>
  );
}

function PhotoCredits({ photos }: { readonly photos: readonly PreviewImage[] }) {
  const creditedPhotos = photos.flatMap((image) =>
    image.credit ? [{ image, credit: image.credit }] : [],
  );

  if (creditedPhotos.length === 0) return null;

  return (
    <p className="text-[13px] leading-[1.5] text-muted">
      Photograph credits:{" "}
      {creditedPhotos.map(({ image, credit }, index) => (
        <Fragment key={image.src}>
          {index > 0 ? "; " : ""}
          {image.caption && <>{image.caption} — </>}
          <a
            href={credit.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-accent"
          >
            {credit.label}
          </a>
          {credit.licenseLabel && credit.licenseHref && (
            <>
              {" ("}
              <a
                href={credit.licenseHref}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-accent"
              >
                {credit.licenseLabel}
              </a>
              {")"}
            </>
          )}
        </Fragment>
      ))}
    </p>
  );
}

// Each entry pairs verifiable project evidence with its explanation; phone layouts stack both columns.
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
      <p className="text-[24px] leading-[1.3] max-md:text-[20px]">{project.summary}</p>
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
      {project.contextPhotos && <PhotoCredits photos={project.contextPhotos} />}
    </div>
  );

  if (project.preview) {
    return (
      <>
        <div className={imageColumn}>
          <InterfaceImage image={project.preview} />
          {project.fragments && project.fragments.length > 0 && (
            <div className="mt-6 grid grid-cols-2 items-start gap-4 max-md:grid-cols-1">
              {project.fragments.map((fragment) => (
                <InterfaceImage key={fragment.src} image={fragment} />
              ))}
            </div>
          )}
        </div>
        <div className={`self-end ${textColumn}`}>{text}</div>
      </>
    );
  }

  if (project.showcase) {
    return (
      <>
        <div className={imageColumn}>
          <ProjectShowcase content={project.showcase} />
        </div>
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
