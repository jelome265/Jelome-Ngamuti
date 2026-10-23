# Portfolio Delivery Plan

This directory defines the work required to move from approved design to a deployed portfolio. Phases are ordered; do not treat future phase work as approved implementation before its prerequisites are met.

## Phase sequence

| Phase | Plan | Exit condition |
|---|---|---|
| 1 — Homepage design | [homepage-design.md](homepage-design.md) | Desktop and mobile composition reviewed and approved |
| 2 — Content | [phase-2-content.md](phase-2-content.md) | All visible facts, projects, and links are verified |
| 3 — Application foundation | [phase-3-application-foundation.md](phase-3-application-foundation.md) | Reproducible React/TSX, Vite, Tailwind v4 scaffold passes base checks |
| 4 — Implementation | [phase-4-implementation.md](phase-4-implementation.md) | Approved responsive homepage is implemented against design and content |
| 5 — Verification and deployment | [phase-5-verification-deployment.md](phase-5-verification-deployment.md) | Release checks pass on the production URL |

## Working rules

- Complete and review phases in sequence. A later phase may identify a problem that requires a documented earlier-phase change.
- Keep source content factual; identify unknowns and resolve them instead of inventing details.
- Use the existing design tokens, information architecture, component inventory, SEO plan, and architecture document as constraints.
- Commit focused changes with understandable messages. Do not force-push or rewrite Git history.
- Do not mark a phase complete merely because its files exist. Use each phase's exit criteria.
- The project currently contains planning documentation, not the application scaffold. No build or browser verification can be claimed until implementation exists.
