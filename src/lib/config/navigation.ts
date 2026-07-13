export interface NavLink {
  label: string;
  id: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Education', id: 'education' },
  { label: 'Testimonials', id: 'testimonials' },
  { label: 'Contact', id: 'contact' },
];

export const SECTION_RAIL_IDS = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'contact'] as const;
