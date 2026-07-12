# PLAN — Jelome Ngamuti Portfolio

## Project Vision

A high-performance, immersive developer portfolio that balances cinematic WebGL motion with editorial clarity. Not a template — a crafted digital presence that demonstrates engineering depth, design sensibility, and systems thinking from first principles.

---

## Guiding Principles

| Principle | Application |
|---|---|
| **Presence over volume** | Every element earns its place. Fewer effects, more meaning. |
| **Motion with purpose** | Every animation serves navigation, hierarchy, or feedback — never decoration alone. |
| **Performance is a feature** | 60 FPS on mid-range mobile, 144 FPS on desktop. No compromises. |
| **Boring stack, remarkable output** | React + TypeScript + Tailwind + Three.js. Proven tools, pushed to their edge. |
| **Resilient by default** | Graceful degradation for reduced motion, slow networks, missing WebGL. |
| **Zero inline CSS** | All styling via Tailwind utility classes or external CSS. No `style={}` props anywhere. |

---

## Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | **Next.js 16** (App Router, RSC, Turbopack) | SSR for SEO, file-based routing, image optimization |
| Language | **TypeScript 5** (strict) | No implicit any, no unsound escapes |
| Runtime | **Node.js 22** | Latest LTS, native ESM |
| 3D/WebGL | **Three.js** + **React Three Fiber** + **Drei** | Immersive scenes, GPU-instanced particles, custom shaders |
| Motion | **GSAP** (scroll, timeline) + **Framer Motion** (UI, layout) | GSAP for scroll-driven choreography, Framer for mount/unmount |
| Smooth Scroll | **Lenis** | Unified touch/trackpad/mouse, scroll-coupled effects |
| Styling | **Tailwind CSS 4.x** + CSS custom properties | Design tokens, utility-first, no runtime, **no inline `style={}`** |
| Build | **Turbopack** (Next.js 16 default) | Fast HMR, tree-shaking |
| Package Manager | **pnpm** | Disk-efficient, strict dependency resolution |
| Email | **EmailJS** | No backend needed for contact form |
| Deployment | **Vercel** | Edge-ready, ISR for dynamic sections |
| Analytics | **PostHog** | Privacy-respecting, event-based |

---

## CSS Rule

**Zero tolerance for `style={}` props.** Every visual property must be expressed through:
- Tailwind utility classes (`className="text-red-500 bg-surface p-4"`)
- External CSS files (`globals.css`, component-level `.module.css`)
- CSS custom properties defined in `globals.css` and toggled via class names or `data-*` attributes
- Conditional class name generation with `cn()`

For truly runtime-dynamic values (scroll progress, mouse position), use **DOM refs + direct element property mutations** in `useEffect`, or **CSS custom properties set on `data-*` attributes** consumed by external CSS selectors. Never the `style` prop.

---

## Full Directory Architecture

```
jelome-ngamuti-portfolio/
├── .github/workflows/
│   ├── ci.yml
│   └── deploy.yml
├── public/
│   ├── images/
│   │   ├── projects/
│   │   ├── og-default.jpg
│   │   ├── favicon.ico
│   │   ├── apple-touch-icon.png
│   │   └── avatar.webp
│   ├── models/
│   │   └── hero-scene.glb
│   ├── resume.pdf
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── ai.txt
│   └── llms.txt
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── not-found.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ScrollProgress.tsx
│   │   │   ├── BackToTop.tsx
│   │   │   └── SectionRail.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── FeaturedProjects.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Education.tsx
│   │   │   ├── Certifications.tsx
│   │   │   ├── Achievements.tsx
│   │   │   ├── GitHubStats.tsx
│   │   │   ├── TechStack.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── ResumeSection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   ├── Container.tsx
│   │   │   ├── GlassCard.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Pill.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── ScrollIndicator.tsx
│   │   ├── webgl/
│   │   │   ├── HeroParticles.tsx
│   │   │   ├── SkillOrbit.tsx
│   │   │   ├── GitHubGlobe.tsx
│   │   │   ├── Scene404.tsx
│   │   │   ├── shaders/
│   │   │   │   ├── vertex.glsl
│   │   │   │   ├── fragment.glsl
│   │   │   │   ├── fbm-noise.glsl
│   │   │   │   └── ink-bleed.glsl
│   │   │   └── useDeviceTier.ts
│   │   └── animation/
│   │       ├── TextScramble.tsx
│   │       ├── MagneticButton.tsx
│   │       ├── Reveal.tsx
│   │       ├── TiltCard.tsx
│   │       ├── AnimatedCounter.tsx
│   │       └── TypingAnimation.tsx
│   ├── lib/
│   │   ├── data/
│   │   │   ├── site.ts
│   │   │   ├── projects.ts
│   │   │   ├── skills.ts
│   │   │   ├── experience.ts
│   │   │   ├── education.ts
│   │   │   ├── certifications.ts
│   │   │   ├── achievements.ts
│   │   │   └── testimonials.ts
│   │   ├── hooks/
│   │   │   ├── useScrollProgress.ts
│   │   │   ├── useDeviceTier.ts
│   │   │   ├── useLenis.ts
│   │   │   ├── useReducedMotion.ts
│   │   │   ├── useIntersectionObserver.ts
│   │   │   ├── useTheme.ts
│   │   │   ├── useActiveSection.ts
│   │   │   └── useGitHubStats.ts
│   │   ├── utils/
│   │   │   ├── cn.ts
│   │   │   ├── clamp.ts
│   │   │   ├── fluid.ts
│   │   │   ├── formatDate.ts
│   │   │   └── validation.ts
│   │   ├── providers/
│   │   │   ├── ThemeProvider.tsx
│   │   │   ├── LenisProvider.tsx
│   │   │   ├── DeviceTierProvider.tsx
│   │   │   └── AnalyticsProvider.tsx
│   │   └── types/
│   │       ├── project.ts
│   │       ├── skill.ts
│   │       ├── experience.ts
│   │       ├── education.ts
│   │       ├── certification.ts
│   │       ├── achievement.ts
│   │       ├── testimonial.ts
│   │       └── site.ts
│   └── middleware.ts
├── .env.local
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── next.config.ts
├── tsconfig.json
├── pnpm-lock.yaml
├── package.json
└── AGENTS.md
```

---

## Core Data Flow

```
lib/data/*.ts  (typed constant arrays)
       │
       ▼
app/page.tsx → sections/Hero ← site.ts
              → sections/About ← site.ts
              → sections/Skills ← skills.ts
              → sections/FeaturedProjects ← projects.ts
              → sections/Experience ← experience.ts
              → sections/Education ← education.ts
              → sections/Certifications ← certifications.ts
              → sections/Achievements ← achievements.ts
              → sections/GitHubStats ← useGitHubStats()
              → sections/TechStack ← skills.ts
              → sections/Testimonials ← testimonials.ts
              → sections/ResumeSection ← static
              → sections/ContactSection ← form state

WebGL components → React.lazy() + Suspense
                 → DeviceTierProvider controls quality
```

---

## Performance Architecture

| Concern | Strategy |
|---|---|
| WebGL cost | Device tier detection → cap DPR, render resolution, disable post-processing on low tier |
| Images | Next.js Image with WebP, lazy load, blur placeholder |
| 3D assets | Draco compression, GPU instancing, frustum culling |
| Scroll | Lenis on desktop, native scroll on mobile (touch momentum) |
| Reduced motion | `prefers-reduced-motion` → disable GSAP timelines, snap animations to end state |
| Code splitting | `React.lazy()` on every Three.js scene, dynamic import of heavy libraries |
| Fonts | `next/font` with `display: swap`, subset Latin |
| Styling | Zero inline CSS. All styling via Tailwind classes + external CSS files |

---

## Phases

| # | Phase | Days | File |
|---|---|---|---|
| 0 | Foundation — Skeleton, routing, design tokens, a11y baseline | 1–3 | [phase-0-foundation.md](./phase-0-foundation.md) |
| 1 | Hero & Motion Background — WebGL particles, typing animation, CTAs | 4–7 | [phase-1-hero-motion.md](./phase-1-hero-motion.md) |
| 2 | Core Sections — About, Skills, Experience, Education, scroll reveals | 8–12 | [phase-2-core-sections.md](./phase-2-core-sections.md) |
| 3 | Projects & GitHub — Bento grid, filtering, case studies, live stats | 13–17 | [phase-3-projects-github.md](./phase-3-projects-github.md) |
| 4 | Testimonials, Resume & Contact — Social proof, form, resume download | 18–21 | [phase-4-testimonials-resume-contact.md](./phase-4-testimonials-resume-contact.md) |
| 5 | Polish & Modern Features — Transitions, easter eggs, SEO, 404 | 22–26 | [phase-5-polish-features.md](./phase-5-polish-features.md) |
| 6 | QA, Testing & Launch — Cross-browser, perf, a11y audit, go-live | 27–30 | [phase-6-qa-launch.md](./phase-6-qa-launch.md) |

---

## Rollback Plan

| Scenario | Action |
|---|---|
| New section breaks build | `git revert` + `git stash` the feature branch |
| WebGL scene causes crash | Feature-flag the scene, serve static fallback |
| GitHub API rate limit exhausted | Cache aggressively (ISR 30 min), show last-known-good data |
| EmailJS free tier exceeded | Show fallback email address, upgrade plan |
| Contact form spam spike | Enable CAPTCHA, tighten rate limits, add hidden field analysis |
| Performance regression >10% | Revert last bundle, profile with Lighthouse CI |
| Accessibility violation found | Tag as P1, fix before next deploy |

---

## Future (Post-Launch)

- [ ] i18n (English / French) with next-intl
- [ ] Blog with MDX + RSS feed (Atom + JSON)
- [ ] Dark mode photography (alternative headshots with different lighting)
- [ ] Case study video walkthroughs (hosted on Cloudflare Stream)
- [ ] AI-powered project recommendations based on visitor skills
- [ ] Interactive code playground embeds (Sandpack)
- [ ] WakaTime coding activity integration
- [ ] Keyboard shortcut command palette (`Cmd+K`)
