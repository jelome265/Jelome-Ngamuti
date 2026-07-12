export interface SiteConfig {
  name: string;
  monogram: string;
  titles: string[];
  tagline: string;
  bio: string;
  photo: string;
  resumeUrl: string;
  social: { github: string; linkedin: string; email: string; phone?: string };
  builtWith: string[];
}
