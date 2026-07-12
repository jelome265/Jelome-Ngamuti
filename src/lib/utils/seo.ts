import { siteConfig } from '@/lib/data/site';

export interface PersonStructuredData {
  '@context': 'https://schema.org';
  '@type': 'Person';
  name: string;
  url: string;
  jobTitle: string;
  sameAs: string[];
}

export function personStructuredData(): PersonStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    url: 'https://jelomengamuti.dev',
    jobTitle: siteConfig.titles[0] ?? 'Software Engineer',
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
    ],
  };
}
