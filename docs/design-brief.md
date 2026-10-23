# Design Brief

## Product

A personal developer portfolio for Jelome Ngamuti. It should present credible evidence of software engineering ability and make it easy for recruiters, hiring managers, and engineers to evaluate the work.

## Audience

- Recruiters and hiring managers assessing candidates for internships and junior roles.
- Software engineers reviewing project quality, technical decisions, and code.
- Potential collaborators looking for relevant projects or a reliable way to make contact.

## Goals

1. Communicate the developer's focus and current level clearly.
2. Make selected projects and their source repositories easy to inspect.
3. Show technical thinking through concrete project context, decisions, constraints, and evidence.
4. Provide a direct contact path without requiring an account or a form submission.
5. Work reliably on mobile devices and slower connections.

## Visual direction

**Clean, medieval-inspired, professional.**

Use strong typographic hierarchy, architectural geometry, restrained rules and borders, serif display typography, and subtle manuscript-inspired details. The site must still feel contemporary and engineering-led. Avoid fantasy illustrations, faux parchment effects, ornamental overload, generic template patterns, and decorative elements that compete with project evidence.

## Content principles

- Be factual. Do not invent achievements, adoption numbers, client results, testimonials, work experience, certifications, or project completion status.
- Prefer project case studies with the problem, role, implementation, meaningful technical decisions, current status, and links to source/demo where available.
- Distinguish shipped functionality from planned work and experiments.
- Avoid skill-rating bars, arbitrary percentages, and logo walls without context.
- Keep copy concise, specific, and understandable to both technical and non-technical readers.

## Constraints

- Frontend: React with TypeScript and TSX.
- Build tooling: Vite.
- Styling: latest stable Tailwind CSS v4, integrated through its Vite plugin.
- Initial delivery should be a static site. No backend, database, account system, or contact-form service is required.
- Keep dependencies small; do not add a routing, animation, state-management, analytics, or UI framework unless a demonstrated requirement justifies it.
- Support keyboard navigation, reduced motion, readable contrast, responsive layouts, and touch input.
- Never expose secrets in browser code or public environment variables.

## Success criteria

- A first-time visitor can identify who the portfolio belongs to, its technical focus, and the main next action within a few seconds.
- Featured work is easy to reach from the first screen and has substantive, verifiable details.
- GitHub and project links lead to the correct destinations; unavailable demos are not presented as live.
- Every interactive control works with keyboard and touch input and has a visible focus state.
- The layout remains usable at 320 CSS pixels wide and at 200% zoom without loss of content or essential functionality.
- Production checks cover the build, semantic structure, keyboard behavior, contrast, metadata, and social preview.
- Performance targets are treated as measurable validation goals, not as claims until tested against a deployed build.
