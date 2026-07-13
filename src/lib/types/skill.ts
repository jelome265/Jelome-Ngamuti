export type SkillCategory = 'programming' | 'frontend' | 'backend' | 'database' | 'devops' | 'cloud' | 'tools';

export interface Skill {
  name: string;
  category: SkillCategory;
  icon?: string;
  level?: number;
}
