# Phase 3 — Application Foundation

**Prerequisites:** Phase 1 layout approved; Phase 2 content inventory accepted.  
**Deliverable:** A minimal, reproducible React/TSX application with Vite and Tailwind CSS v4, ready for implementation.

## 1. Technology baseline

- React with TypeScript and TSX.
- Vite for local development and static production build.
- Tailwind CSS v4 through the official @tailwindcss/vite plugin.
- npm with a committed package-lock.json.
- Typed local data; no runtime GitHub API, backend, database, or CMS for the first release.
- Static hosting compatible with Vite’s dist output.

At setup time, query the current stable Tailwind CSS v4 package and install the latest stable v4 release, not a prerelease and not a v3 version. As of the date of this plan, npm lists 4.3.3 as the latest stable package. Recheck at implementation time and record the resolved version in package-lock.json. Source: https://www.npmjs.com/package/tailwindcss

Use a currently supported Node.js LTS release compatible with the selected Vite version. Check the official Node and Vite requirements during setup instead of hardcoding a version based on an old planning date.

## 2. Scaffolding requirements

- Scaffold a Vite React + TypeScript app in the existing repository without deleting README.md or docs/.
- Review any generated README so it does not replace the project README or remove documentation links.
- Add Tailwind v4 and its Vite plugin using their current official setup instructions.
- Use the v4 CSS-first theme setup; do not carry over v3 directives or a legacy config unless there is a documented compatibility reason.
- Set TypeScript to strict mode and use correct types rather than any.
- Commit the lockfile and ensure an install from that lockfile works.
- Add only tools that serve a clear purpose. Avoid a router, global state library, animation library, UI kit, analytics package, API client, or testing framework by default.
- Include a .gitignore that excludes node_modules, build output, local environment files, and editor/OS noise.

## 3. Initial application structure

    .
    ├── README.md
    ├── docs/
    │   ├── design-brief.md
    │   ├── information-architecture.md
    │   ├── design-tokens.md
    │   ├── components.md
    │   ├── responsive-accessibility.md
    │   ├── seo-metadata.md
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

Create only the subdirectories and files that are actually needed during implementation. This is a proposed structure, not a requirement to create empty folders up front.

## 4. Initial configuration

- package scripts should provide development server, production build, preview, lint, and TypeScript validation.
- Vite build output is dist/.
- Global CSS imports Tailwind and defines shared theme variables from ../design-tokens.md in the CSS-first theme layer.
- index.html includes language, charset, viewport, title, description, theme color, and suitable icon references.
- No secret credentials are required. Public portfolio content must not depend on environment variables to render.
- Use font fallbacks and avoid downloading all weights of every font.

## 5. Foundation verification

- Install dependencies from the committed lockfile.
- Start the development server and confirm the initial page is reachable.
- Run the production build successfully.
- Run TypeScript validation and linting.
- Confirm Tailwind v4 utilities compile and global theme tokens are available.
- Confirm docs/, README.md, and existing Git history remain intact.

## 6. Phase 3 acceptance criteria

- [ ] React + TypeScript/TSX and Vite are scaffolded.
- [ ] Latest stable Tailwind CSS v4 and the official Vite plugin are installed and locked.
- [ ] No generated files silently replace project documentation.
- [ ] The package lock installs cleanly.
- [ ] Strict TypeScript, lint, and build checks pass.
- [ ] The foundation contains no unnecessary backend, router, global state, UI framework, or runtime API integration.
