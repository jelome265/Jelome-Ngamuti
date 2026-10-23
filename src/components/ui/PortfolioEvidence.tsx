import { lilongwePhotos } from "../../data/imagery";
import { projects } from "../../data/projects";
import type { PreviewImage } from "../../types/portfolio";

type EvidenceImage = PreviewImage & {
  readonly kind: "place" | "interface";
};

interface PortfolioEvidenceProps {
  readonly variant: "home" | "about";
}

const usora = projects.find((project) => project.id === "usora");

function creditFor(image: PreviewImage) {
  if (!image.credit) return null;

  return (
    <span className="block text-[13px] leading-[1.45] text-muted">
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
  );
}

function EvidenceFigure({
  image,
  placement,
}: {
  readonly image: EvidenceImage;
  readonly placement: string;
}) {
  return (
    <figure className={`reveal m-0 ${placement}`}>
      {image.kind === "interface" ? (
        <div data-ui className="work-picture overflow-hidden">
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            className="h-auto w-full"
          />
        </div>
      ) : (
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          width={960}
          height={720}
          className="aspect-[4/3] w-full object-cover"
        />
      )}
      <figcaption className="mt-3 text-[15px] leading-[1.45]">
        <span className="block">{image.caption ?? "Project interface detail."}</span>
        {creditFor(image)}
      </figcaption>
    </figure>
  );
}

export function PortfolioEvidence({ variant }: PortfolioEvidenceProps) {
  const preview = usora?.preview;
  const fragments = usora?.fragments;
  const [area2Photo, nchesiPhoto] = lilongwePhotos;
  const facePanel = fragments?.[0];
  const pipelinePanel = fragments?.[1];

  if (!preview || !facePanel || !pipelinePanel || !area2Photo || !nchesiPhoto) return null;

  const placeImages: readonly EvidenceImage[] = [
    { ...area2Photo, kind: "place" },
    { ...nchesiPhoto, kind: "place" },
  ];
  const interfaceImages: readonly EvidenceImage[] = [
    { ...preview, kind: "interface" },
    { ...facePanel, kind: "interface" },
    { ...pipelinePanel, kind: "interface" },
  ];

  const [area2, nchesi] = placeImages;
  const [usoraPreview, usoraFace, usoraPipeline] = interfaceImages;
  if (!area2 || !nchesi || !usoraPreview || !usoraFace || !usoraPipeline) return null;

  const images: readonly EvidenceImage[] =
    variant === "home"
      ? [area2, usoraPreview, usoraFace, nchesi]
      : [nchesi, usoraPipeline, usoraPreview, area2, usoraFace];

  const placements =
    variant === "home"
      ? [
          "col-span-5 col-start-1 max-md:col-span-full max-md:col-start-auto",
          "col-span-7 col-start-6 max-md:col-span-full max-md:col-start-auto",
          "col-span-6 col-start-1 max-md:col-span-full max-md:col-start-auto",
          "col-span-6 col-start-7 max-md:col-span-full max-md:col-start-auto",
        ]
      : [
          "col-span-7 col-start-1 max-md:col-span-full max-md:col-start-auto",
          "col-span-5 col-start-8 max-md:col-span-full max-md:col-start-auto",
          "col-span-5 col-start-1 max-md:col-span-full max-md:col-start-auto",
          "col-span-7 col-start-6 max-md:col-span-full max-md:col-start-auto",
          "col-span-6 col-start-4 max-md:col-span-full max-md:col-start-auto",
        ];

  return (
    <section
      aria-labelledby={variant === "home" ? "evidence-heading" : "context-heading"}
      className="mx-auto max-w-[1280px] px-[32px] pb-[120px] max-md:px-[18px] max-md:pb-16"
    >
      <div className="grid grid-cols-12 items-end gap-x-6 gap-y-4 max-md:grid-cols-1">
        <h2
          id={variant === "home" ? "evidence-heading" : "context-heading"}
          className="reveal col-span-7 text-[40px] leading-[1.08] font-bold tracking-[-0.02em] max-md:col-span-full"
        >
          {variant === "home" ? "Work, built from Malawi" : "The context around the work"}
        </h2>
        <p className="reveal col-span-5 col-start-8 text-[18px] leading-[1.45] text-muted max-md:col-span-full max-md:col-start-auto">
          {variant === "home"
            ? "Selected project evidence, alongside photographs of Lilongwe—the place I work from."
            : "I build from Lilongwe, Malawi. Local street scenes sit alongside interface captures from USORA, a project in development."}
        </p>
      </div>

      <div className="mt-12 grid grid-cols-12 items-start gap-x-6 gap-y-12 max-md:grid-cols-1">
        {images.map((image, index) => (
          <EvidenceFigure
            key={`${image.src}-${index}`}
            image={image}
            placement={placements[index] ?? "col-span-full"}
          />
        ))}
      </div>
    </section>
  );
}
