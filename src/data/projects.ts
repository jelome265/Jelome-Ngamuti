import type { Project } from "../types/portfolio";

// Facts verified against public repositories (docs/phases/phase-2-candidate-evidence.md).
// Owner-approved selection: Sitolo, USORA, Rustacean. Copy is pending final Phase 2 approval.
export const projects: readonly Project[] = [
  {
    id: "usora",
    name: "USORA",
    summary: "A multi-tenant know-your-customer (KYC) platform for identity verification.",
    contribution:
      "Rust and Java services. Recent work addresses service test and build failures.",
    status: "In development",
    technologies: ["Rust", "Java", "Spring Boot"],
    note: "No live deployment. Recent test fixes have not been run locally.",
    repoUrl: "https://github.com/jelome265/usora",
    featured: true,
    preview: {
      src: "/images/usora-preview.png",
      alt: "Screenshot of the USORA KYC platform showing a facial verification view beside a verification pipeline panel.",
    },
  },
  {
    id: "sitolo",
    name: "Sitolo",
    summary:
      "A business operating system for small merchants in Malawi, covering stock, sales, collections, and reporting.",
    contribution:
      "Rust backend core. Current work covers durable audit evidence and a transactional outbox.",
    status: "Active development",
    technologies: ["Rust"],
    note: "Pre-validation. Commercial pricing and segment assumptions are not yet tested.",
    repoUrl: "https://github.com/jelome265/sitolo",
  },
  {
    id: "rustacean",
    name: "Rustacean",
    summary:
      "Enterprise Rust engineering skills for AI coding agents, backed by executable checks.",
    contribution:
      "Five agent skills, a dry-run-first installer with hash verification, and a rule validator.",
    status: "Released",
    technologies: ["Rust", "Python", "npm"],
    repoUrl: "https://github.com/jelome265/Rustacean",
    demo: {
      label: "Project site",
      href: "https://jelome265.github.io/Rustacean/",
    },
  },
];
