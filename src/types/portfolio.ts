export type ProjectStatus = "Active development" | "In development" | "Released";

export interface ExternalLink {
  readonly label: string;
  readonly href: string;
}

export interface ImageCredit {
  readonly label: string;
  readonly href: string;
}

export interface PreviewImage {
  readonly src: string;
  readonly alt: string;
  readonly caption?: string;
  readonly credit?: ImageCredit;
}

export interface Project {
  readonly id: string;
  readonly name: string;
  readonly summary: string;
  readonly contribution: string;
  readonly status: ProjectStatus;
  readonly technologies: readonly string[];
  readonly note?: string;
  readonly repoUrl: string;
  readonly demo?: ExternalLink;
  readonly preview?: PreviewImage;
  readonly featured?: boolean;
  readonly fragments?: readonly PreviewImage[];
  readonly contextPhotos?: readonly PreviewImage[];
}

export interface FocusGroup {
  readonly area: string;
  readonly technologies: readonly string[];
  readonly projects: readonly string[];
}
