import { type Experience } from '@/lib/types/experience';

export const experience: Experience[] = [
  {
    id: 'exp-1',
    role: 'Software Engineering Student',
    company: 'University Project',
    startDate: '2024-09',
    description: 'Designed and implemented full-stack applications.',
    highlights: [
      'Built relational databases with MySQL/PostgreSQL',
      'Designed responsive sites with HTML5, CSS3, Tailwind',
      'Developed Python data processing apps',
      'Created ER diagrams for database architecture',
      'Implemented complex SQL queries',
    ],
    type: 'academic',
  },
  {
    id: 'exp-2',
    role: 'Freelance Web Developer',
    company: 'Self-Employed',
    startDate: '2023-06',
    endDate: '2024-08',
    description: 'Built responsive websites for small businesses.',
    highlights: [
      'Delivered 5+ client sites with React + Tailwind',
      'Implemented CI/CD pipelines',
      'Designed and integrated RESTful APIs',
      'Achieved 90+ Lighthouse scores',
    ],
    type: 'freelance',
  },
];
