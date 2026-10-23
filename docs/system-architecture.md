# System Architecture

## 1. Architecture summary

Build a lightweight, static-first portfolio using React and TypeScript (TSX), Vite, and Tailwind CSS v4. Render page sections from typed local content data. Deploy the generated static assets to a static host.

The first release does not need a backend, database, API, authentication, content-management system, or contact-form service.

## 2. Technology decisions

| Concern | Decision | Reason |
|---|---|---|
| UI | React + TypeScript / TSX | Component composition with typed project and profile content |
| Build tooling | Vite | Small, fast frontend toolchain and static production output |
| Styling | Tailwind CSS v4 | Utility-first styling with CSS-first theme configuration |
| Tailwind integration | @tailwindcss/vite | First-party Vite integration |
| Content | Typed TypeScript modules | Simple, local, version-controlled content; no remote content dependency |
| Navigation | Section anchors initially | Avoid client-side routing until separate pages are justified |
| State | Local React state only where needed | Header/menu behavior does not justify a global state library |
| Hosting | Static hosting compatible with the Vite dist output | The site is public content and requires no server runtime |

The latest Tailwind release verified for this planning document is 4.3.3 as of 23 October 2026. Re-check the official release/package registry when scaffolding, install the latest stable release, and commit package-lock.json so the resolved dependency graph is reproducible. Use Tailwind v4's CSS-first setup and avoid legacy v3 directives/configuration unless a proven compatibility requirement exists.

## 3. Runtime and delivery flow

1. A browser requests the static site.
2. The host serves the generated HTML, CSS, JavaScript, fonts, and images.
3. React composes the header, page sections, project cards, and footer.
4. Project/profile data is imported from typed local modules.
5. Navigation and project/contact actions link directly to page sections or verified external destinations.

There is no runtime application server in the initial architecture. GitHub repositories and optional project demos are external destinations; the portfolio should not scrape GitHub at runtime or rely on a third-party API to render its core content.

## 4. Proposed folder structure

The design documents remain at the repository root. Create the implementation folders when application work begins.

    .
    ├── README.md
    ├── design-brief.md
    ├── information-architecture.md
    ├── design-tokens.md
    ├── components.md
    ├── responsive-accessibility.md
    ├── seo-metadata.md
    ├── system-architecture.md
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── public/
    │   ├── favicon.svg
    │   ├── og-image.png
    │   ├── robots.txt
    │   ├── fonts/
    │   └── images/
    └── src/
        ├── main.tsx
        ├── app/
        │   └── App.tsx
        ├── components/
        │   ├── layout/
        │   │   ├── SiteHeader.tsx
        │   │   ├── SiteFooter.tsx
        │   │   ├── Container.tsx
        │   │   └── Section.tsx
        │   └── ui/
        │       ├── Button.tsx
        │       └── SectionHeading.tsx
        ├── sections/
        │   ├── Hero.tsx
        │   ├── SelectedProjects.tsx
        │   ├── TechnicalFocus.tsx
        │   ├── About.tsx
        │   └── Contact.tsx
        ├── data/
        │   ├── profile.ts
        │   ├── projects.ts
        │   └── skills.ts
        ├── types/
        │   └── project.ts
        └── styles/
            └── globals.css

Only add files as the implementation needs them. For example, do not create a global state folder, a service/API layer, or a routing layer before a real requirement exists.

## 5. Module boundaries

- **app/** assembles the page and establishes top-level layout.
- **components/layout/** contains site-wide structure and shared layout primitives.
- **components/ui/** contains small reusable controls with defined states.
- **sections/** contains complete content sections in page order.
- **data/** stores typed, factual portfolio content separately from presentation.
- **types/** defines domain types for projects and any other data that warrants explicit types.
- **styles/** imports Tailwind and defines global/base styles plus shared CSS theme variables.
- **public/** contains static assets that need stable public URLs.

Keep content out of component markup where it can be represented as typed data. Keep components focused and avoid premature abstraction.

## 6. Styling setup

Use Tailwind CSS v4 with the official Vite plugin. The global stylesheet should import Tailwind and define the approved design tokens in its CSS-first theme layer. Components should use utilities and shared tokens rather than independent hard-coded palettes.

Font files, images, and the social preview should have controlled sizes and sensible fallbacks. Avoid heavy motion, WebGL, or decorative third-party scripts in the initial release.

## 7. Quality gates

Before each release:
- Install dependencies from the committed lockfile.
- Run TypeScript checks, linting, and the production build.
- Test all navigation, project links, external destinations, and mobile-menu states.
- Check responsive layouts, keyboard access, reduced motion, and contrast.
- Inspect title, description, canonical URL, structured data, and social preview.
- Confirm every claim and project status against the current source of truth.
- Review the generated output for missing assets, console errors, and broken links.

Add a focused component test setup if interactive behavior or regression risk justifies it; do not make testing infrastructure more complex than the site.
