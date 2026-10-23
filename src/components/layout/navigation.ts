import { profile } from "../../data/profile";

export interface NavItem {
  readonly label: string;
  readonly to: string;
  readonly external?: boolean;
}

export const navigationItems: readonly NavItem[] = [
  { label: "Projects", to: "/projects" },
  { label: "About", to: "/about" },
  { label: "Contact", to: `mailto:${profile.email}`, external: true },
];
