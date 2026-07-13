export type ProjectCategory = 'frontend' | 'backend' | 'fullstack' | 'devops' | 'database';

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  screenshots: string[];
  technologies: string[];
  category: ProjectCategory;
  challenges?: string[];
  solutions?: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  date: string;
}
