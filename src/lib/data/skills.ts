import { type Skill, type SkillCategory } from '@/lib/types/skill';

export const skills: Skill[] = [
  { name: 'Python', category: 'programming', level: 90 },
  { name: 'JavaScript', category: 'programming', level: 85 },
  { name: 'TypeScript', category: 'programming', level: 80 },
  { name: 'Java', category: 'programming', level: 75 },
  { name: 'SQL', category: 'programming', level: 85 },
  { name: 'Rust', category: 'programming', level: 50 },
  { name: 'HTML5', category: 'frontend', level: 95 },
  { name: 'CSS3', category: 'frontend', level: 90 },
  { name: 'Bootstrap', category: 'frontend', level: 85 },
  { name: 'Tailwind CSS', category: 'frontend', level: 88 },
  { name: 'React', category: 'frontend', level: 82 },
  { name: 'Node.js', category: 'backend', level: 80 },
  { name: 'Express', category: 'backend', level: 78 },
  { name: 'Django', category: 'backend', level: 75 },
  { name: 'Spring Boot', category: 'backend', level: 70 },
  { name: 'MySQL', category: 'database', level: 85 },
  { name: 'PostgreSQL', category: 'database', level: 80 },
  { name: 'MongoDB', category: 'database', level: 72 },
  { name: 'Git', category: 'devops', level: 90 },
  { name: 'GitHub', category: 'devops', level: 88 },
  { name: 'Docker', category: 'devops', level: 75 },
  { name: 'CI/CD', category: 'devops', level: 70 },
  { name: 'AWS', category: 'cloud', level: 65 },
  { name: 'Azure', category: 'cloud', level: 60 },
  { name: 'Google Cloud', category: 'cloud', level: 55 },
  { name: 'VS Code', category: 'tools', level: 95 },
  { name: 'Figma', category: 'tools', level: 70 },
  { name: 'Postman', category: 'tools', level: 80 },
  { name: 'Linux', category: 'tools', level: 78 },
];

export const skillCategories = [
  { id: 'programming', label: 'Programming' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Databases' },
  { id: 'devops', label: 'DevOps' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'tools', label: 'Tools' },
] as const;

export const SKILL_CATEGORIES: Record<SkillCategory, string> = {
  programming: 'Programming Languages',
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Databases',
  devops: 'DevOps',
  cloud: 'Cloud',
  tools: 'Tools',
};

export const SKILL_CATEGORY_COLORS: Record<SkillCategory, string> = {
  programming: 'from-blue-500 to-cyan-500',
  frontend: 'from-purple-500 to-pink-500',
  backend: 'from-green-500 to-emerald-500',
  database: 'from-orange-500 to-amber-500',
  devops: 'from-red-500 to-rose-500',
  cloud: 'from-indigo-500 to-blue-500',
  tools: 'from-slate-400 to-slate-600',
};
