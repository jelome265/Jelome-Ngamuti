export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description: string;
  highlights: string[];
  type: 'internship' | 'freelance' | 'volunteer' | 'academic' | 'full-time';
}
