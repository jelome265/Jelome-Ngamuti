# DESIGN — Jelome Ngamuti Portfolio

## Design Philosophy

**"Presence over polish."** This portfolio is not a collection of visual effects — it is a cohesive environment where every pixel, motion, and interaction serves the visitor's understanding of who Jelome Ngamuti is as an engineer.

The visual language bridges two worlds:
- **Editorial precision** (Swiss-inspired grid systems, restrained typography, generous whitespace)
- **Technical depth** (WebGL motion backgrounds, scroll-driven 3D, custom shaders)

---

## Brand Identity

### Logotype & Wordmark

The primary lockup is **JELOME NGAMUTI** set in a geometric sans-serif (Inter Bold) with tracking of `0.08em`. A monogram lockup `JN` is used for favicon, mobile nav, and loading states.

### Brand Voice

| Attribute | Expression |
|---|---|
| **Confident** | Direct statements, no hedging |
| **Methodical** | Structured content, clear hierarchies |
| **Approachable** | Warm accent colors, human-scale typography |
| **Technical** | Subtle code motifs, terminal-style reveals |

### Tagline

> System Engineer  | Software Engineer |  Full-Stack Developer 
> I build secure, scalable and user-focused software solutions.

---

## Color System

### Design Tokens

```css
/* Primary palette — engineered authority */
--color-primary:        #3b82f6;   /* Blue 500 — CTAs, links, active states */
--color-primary-dark:   #1d4ed8;   /* Blue 700 — hover states */
--color-primary-light:  #60a5fa;   /* Blue 400 — subtle highlights */

/* Neutral palette */
--color-bg:             #0a0a0f;   /* Near-black — dark mode background */
--color-bg-alt:         #12121a;   /* Card backgrounds */
--color-bg-glass:       rgba(18, 18, 26, 0.6);  /* Glassmorphism base */
--color-surface:        #1a1a24;   /* Elevated surfaces */
--color-border:         #2a2a3a;   /* Subtle borders */

/* Text */
--color-text-primary:   #f1f5f9;   /* High emphasis */
--color-text-secondary: #94a3b8;   /* Medium emphasis */
--color-text-muted:     #64748b;   /* Low emphasis — metadata */

/* Accent */
--color-accent:         #f59e0b;   /* Amber — section highlights, badges */
--color-success:        #22c55e;   /* Green — achievement indicators */
--color-error:          #ef4444;   /* Red — form validation */

/* Light mode overrides (set via .light class on root) */
--color-bg:             #f8fafc;
--color-bg-alt:         #f1f5f9;
--color-bg-glass:       rgba(248, 250, 252, 0.7);
--color-surface:        #ffffff;
--color-border:         #e2e8f0;
--color-text-primary:   #0f172a;
--color-text-secondary: #475569;
--color-text-muted:     #94a3b8;
```

### Why This Palette

- **Near-black (#0a0a0f)** over pure `#000000` — softer on the eyes, allows glassmorphism layers to read distinctly
- **Blue primary** — signals trust, competence, engineering rigor
- **Amber accent** — warmth without breaking technical tone; used sparingly for badges, stats, achievements
- **Light mode** — high contrast for readability in bright environments; maintains brand consistency through blue accents

---

## Typography

### Font Stack

| Role | Font | Weight | Fallback |
|---|---|---|---|
| Display headings | **Inter** (sans-serif) | 700–900 | system-ui |
| Body text | **Inter** | 400–500 | system-ui |
| Code / terminal | **JetBrains Mono** | 400–500 | monospace |
| Signature / personal | **Sacramento** (cursive) | 400 | handwriting |

### Type Scale

```css
--text-xs:   0.75rem;   /* 12px — labels, metadata */
--text-sm:   0.875rem;  /* 14px — secondary text */
--text-base: 1rem;       /* 16px — body */
--text-lg:   1.125rem;   /* 18px — large body */
--text-xl:   1.25rem;    /* 20px — subheadings */
--text-2xl:  1.5rem;     /* 24px — section headings */
--text-3xl:  1.875rem;   /* 30px */
--text-4xl:  2.25rem;    /* 36px — hero title */
--text-5xl:  3rem;       /* 48px */
--text-6xl:  3.75rem;    /* 60px — hero emphasis */
```

All type sizes use `clamp()` via a fluid function for seamless scaling between 480px and 2560px viewports.

### Typography Rules

- Max line length: **70 characters** for body text
- Headings: letter-spacing `-0.02em` for tight display feel
- Body: letter-spacing `0.01em` for readability
- Code inline: `--color-primary` background on dark, `--color-surface` on light

---

## Spacing & Layout

### Grid System

- 12-column fluid grid
- Gutter: `1rem` (mobile), `1.5rem` (tablet), `2rem` (desktop)
- Max content width: `1200px`
- Full-width sections allowed for WebGL hero, testimonials, GitHub stats

### Spacing Scale

```css
--space-1:  0.25rem;
--space-2:  0.5rem;
--space-3:  0.75rem;
--space-4:  1rem;
--space-6:  1.5rem;
--space-8:  2rem;
--space-12: 3rem;
--space-16: 4rem;
--space-20: 5rem;
--space-24: 6rem;
```

### Section Rhythm

- Standard section padding: `py-24` (`6rem`) mobile, `py-32` (`8rem`) desktop
- Hero section: min-height `100dvh` (dynamic viewport height)
- Section spacing between: `gap-y-24` (`6rem`)

---

## Motion Design

### Motion Principles

| Principle | Description |
|---|---|
| **Purposeful** | Every animation serves a function — reveal, guide, or feedback |
| **Fast by default** | UI transitions 200–300ms; scroll-driven 400–800ms |
| **Staggered** | Children reveal with 50–80ms delay between each |
| **Eased** | Custom cubic-bezier curves; `power3.out` for entrances, `power2.inOut` for scroll |
| **Respect motion** | `prefers-reduced-motion` → snap to end state, no continuous animations |

### Animation Systems

**1. Text Reveals (GSAP SplitText)**
```
- Characters scramble from random set → resolve to final text
- Clip-path wipe follows scramble (left-to-right, 400ms)
- Used on: Hero heading, section headings
```

**2. Scroll-Triggered Entrances (GSAP ScrollTrigger)**
```
- Elements animate in on scroll with stagger
- Y-offset: 40px → 0, opacity: 0 → 1
- Duration: 600ms, ease: power3.out
- Applied to: section content, project cards, skill tags
```

**3. Hover Micro-interactions (Framer Motion)**
```
- Scale: 1.02 on cards, buttons
- Magnetic effect on CTA buttons (cursor proximity pulls element)
- Glassmorphism border glow on hover
```

**4. Page Transitions (View Transition API + GSAP)**
```
- Current page fades clip-path wipe (0.3s)
- New page content staggers in (0.2s per group)
- WebGL background persists through transition
```

**5. WebGL Background Motion**
```
- Particles respond to mouse position (spring physics)
- Ambient noise displacement (fBM simplex noise, continuous)
- Performance: 30 FPS target on mobile, 60 FPS desktop
- Reduced motion: static gradient fallback
```

### Timing Reference

| Element | Duration | Ease | Delay |
|---|---|---|---|
| Hero heading | 600ms | power3.out | 200ms |
| Typing effect | 2s total | linear, 50ms/char | 800ms |
| CTA buttons | 400ms | power2.out | 1.5s |
| Section heading reveal | 500ms | power3.out | scroll trigger |
| Project card hover | 200ms | power2.out | 0 |
| Page transition out | 300ms | power2.in | click |
| Page transition in | 400ms | power3.out | 100ms after |

---

## Component Design

### Navigation Bar

- **Position:** Fixed top, glassmorphism background (`--color-bg-glass` + `backdrop-blur-xl`)
- **Behavior:** Hidden on scroll down (hero), visible on scroll up; solid background after first section
- **Content:** Logo monogram (left), nav links (center), theme toggle + contact CTA (right)
- **Mobile:** Hamburger menu with full-screen overlay, slide-in from right
- **Active state:** Underline indicator that slides between links

### Hero Section

- **Layout:** Full viewport height, content centered vertically
- **Background:** Three.js particle field + custom shader (fBM noise)
- **Content stack:**
  1. Greeting ("Hi, I'm") — fade in
  2. Name + title — split-text scramble reveal
  3. Value proposition — typing animation (terminal-style cursor)
  4. CTA buttons — magnetic hover, staggered reveal
  5. Professional photo — glassmorphism frame, subtle float animation
  6. Scroll indicator — pulsing chevron, fades out on scroll

### Project Cards

- **Layout:** Bento-box grid (2 columns desktop, 1 column mobile)
- **States:**
  - Default: screenshot thumbnail, title, tech badges
  - Hover: scale 1.02, subtle shadow lift, "View Project" overlay
  - Focus: solid border ring for keyboard navigation
- **Content:** title, description, tech stack badges, links (Live Demo, GitHub)

### Skill Tags

- **Layout:** Categorized grid with section headers
- **Visual:** Rounded pill badges with icon + label
- **Interactive:** Filter by category, search highlight
- **Animation:** Staggered reveal on scroll

### Experience Timeline

- **Layout:** Vertical line with alternating left/right cards (desktop), single column (mobile)
- **Content:** Company/role, date range, bullet points
- **Interaction:** Click to expand details, hover for highlight
- **Animation:** Line draws on scroll, cards fade in at their position

### Contact Form

- **Layout:** Two-column (form left, info right); stacked mobile
- **Fields:** Name, Email, Subject, Message
- **Validation:** Real-time with React Hook Form + Zod
- **States:** idle, typing, validating, submitting, success, error
- **Security:** Honeypot field (hidden), rate limit (3 submissions / 5 min)

---

## Glassmorphism System

```
Glass card:    background: rgba(18, 18, 26, 0.6)
               backdrop-filter: blur(20px)
               border: 1px solid rgba(255, 255, 255, 0.05)
               border-radius: 16px

Glass nav:     background: rgba(18, 18, 26, 0.8)
               backdrop-filter: blur(24px)
               border-bottom: 1px solid rgba(255, 255, 255, 0.05)

Light mode:    background: rgba(248, 250, 252, 0.7)
               backdrop-filter: blur(20px)
               border: 1px solid rgba(0, 0, 0, 0.05)
```

---

## Responsive Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Mobile | 320–639px | 1 column, stacked |
| Tablet | 640–1023px | 2 columns, side nav |
| Desktop | 1024–1439px | 2–3 columns, full nav |
| Wide | 1440px+ | 3 columns, max-width 1200px |

### Mobile Adaptations

- Navigation collapses to hamburger
- Experience timeline becomes single column
- Project cards full-width
- WebGL background reduces particle count by 50%
- Touch targets minimum 44x44px
- No custom cursor
- Native scroll (no Lenis)

---

## Accessibility Baseline

| Requirement | Standard |
|---|---|
| Color contrast | WCAG AA (4.5:1 text, 3:1 large text) |
| Keyboard navigation | All interactive elements reachable and operable |
| Focus indicators | Visible `outline: 2px solid --color-primary` |
| Screen reader | ARIA labels, semantic HTML, live regions for dynamic content |
| Reduced motion | `prefers-reduced-motion` → no auto-play, no parallax, snap reveals |
| Zoom | Layout works up to 200% zoom without horizontal scroll |
| Touch targets | Minimum 44x44px on all interactive elements |

---

## Dark / Light Mode

- **Default:** System preference via `prefers-color-scheme`
- **Toggle:** Sun/moon icon in navigation
- **Persistence:** `localStorage` with system preference fallback
- **Transition:** Smooth color swap on CSS custom properties (no flash)
- **Content:** Photos may have light-mode specific variants

---

## SEO & Meta

| Property | Value |
|---|---|
| Title | Jelome Ngamuti — Software Engineer & Full-Stack Developer |
| Description | I build secure, scalable, and user-focused software solutions. |
| OG Image | `/images/og-default.jpg` (1200x630) |
| JSON-LD | Person schema with name, url, sameAs, jobTitle |
| Sitemap | `/sitemap.xml` auto-generated |
| Robots | `robots.txt` allowing all crawlers, sitemap reference |
| AI surfaces | `/ai.txt`, `/llms.txt` for AI crawler discovery |
