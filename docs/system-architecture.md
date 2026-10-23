# System Architecture

## 1. Architecture summary

Build a lightweight, static-first portfolio using React and TypeScript (TSX), Vite, and Tailwind CSS v4. Render page sections from typed local content data and deploy the static build output to a compatible host.

The first release does not need a backend, database, API, authentication, content-management system, or contact-form service.

## 2. Technology decisions

| Concern | Decision | Reason |
|---|---|---|
| UI | React + TypeScript / TSX | Component composition with typed portfolio content |
| Build tooling | Vite | Small frontend toolchain and static production output |
| Styling | Latest stable Tailwind CSS v4 | Utility-first styles with CSS-first theme configuration |
| Tailwind integration | @tailwindcss/vite | Official Vite integration |
| Package management | npm and committed package-lock.json | Reproducible installs |
| Content | Typed local TypeScript modules | No runtime dependency on a remote API |
| Navigation | Section anchors initially | Separate routes are not justified yet |
| State | Local React state only where required | Mobile navigation does not justify global state |
| Hosting | Static host compatible with Vite dist output | No server runtime required |

At the time this plan was refreshed, npm listed Tailwind CSS 4.3.3 as the latest stable release. Check the package registry again when scaffolding, install the latest stable v4 release, and commit the resolved dependency graph. Avoid prereleases and legacy v3 setup unless a documented compatibility requirement exists.

## 3. Runtime and delivery flow

1. A browser requests the published static site.
2. The host serves HTML, CSS, JavaScript, fonts, and images.
3. React composes the header, page sections, project cards, and footer.
4. Profile and project details are imported from typed local modules.
5. Navigation and project/contact actions lead to page sections or verified external destinations.

The initial site has no runtime application server. GitHub and project demos are external destinations; the portfolio should not scrape GitHub at runtime or require a third-party API to render its core content.

## 4. Repository structure

Keep design and delivery documentation under docs/. The README remains at the repository root. Create application files when Phase 3 starts; this tree describes the intended destination, not files that already exist.

    .
    ├── README.md
    ├── docs/
    │   ├── design-brief.md
    │   ├── information-architecture.md
    │   ├── design-tokens.md
    │   ├── components.md
    │   ├── responsive-accessibility.md
    │   ├── seo-metadata.md
    │   ├── system-architecture.md
    │   └── phases/
    │       ├── README.md
    │       ├── homepage-design.md
    │       ├── phase-2-content.md
    │       ├── phase-3-application-foundation.md
    │       ├── phase-4-implementation.md
    │       └── phase-5-verification-deployment.md
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── public/
    │   ├── favicon.svg
    │   ├── og-image.png
    │   └── images/
    └── src/
        ├── main.tsx
        ├── app/
        │   └── App.tsx
        ├── components/
        │   ├── layout/
        │   └── ui/
        ├── sections/
        ├── data/
        ├── types/
        └── styles/
            └── globals.css

Add only files and subdirectories needed by the implementation. Do not create empty folders, a global state layer, an API/service layer, or routing before a real requirement exists.

## 5. Module boundaries

- **app/** assembles page sections and establishes top-level layout.
- **components/layout/** contains site-wide structure and shared layout primitives.
- **components/ui/** contains small reusable controls with defined states.
- **sections/** contains complete content sections in page order.
- **data/** stores factual portfolio content separately from presentation.
- **types/** defines domain types for projects and other data that warrants explicit types.
- **styles/** imports Tailwind and defines global/base styles and shared CSS theme variables.
- **public/** contains static assets that need stable public URLs.

Keep components focused. Use typed data for repeatable project content and keep design values consistent with docs/design-tokens.md.

## 6. Styling and assets

Use Tailwind CSS v4 with the official Vite plugin. The global stylesheet imports Tailwind and defines approved design tokens in its CSS-first theme layer. Components should use shared tokens rather than an independent palette of hard-coded values.

Keep font weights and images lean. Use CSS/SVG for simple architectural linework where practical. Do not introduce WebGL or heavy visual effects in the initial release.

## 7. Quality gates

Before release:
- Install dependencies from the committed lockfile.
- Run TypeScript checks, linting, and the production build.
- Test all navigation, repository links, optional demo destinations, and mobile-menu states.
- Check responsive layouts, keyboard behavior, reduced motion, and contrast.
- Inspect title, description, canonical URL, structured data, and social preview.
- Confirm every public claim and project status against the Phase 2 content inventory.
- Review the built site for missing assets, browser-console errors, broken links, and accidental disclosure of private information.

Add a focused component test setup if the amount of interactive behavior or regression risk justifies it; keep the toolchain proportional to the site.
