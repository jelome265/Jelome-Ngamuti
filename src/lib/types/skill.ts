export interface Skill {
  name: string;
  category: 'programming' | 'frontend' | 'backend' | 'database' | 'devops' | 'cloud' | 'tools';
  icon?: string;
  level?: number;
}
