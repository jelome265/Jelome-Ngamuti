# PRODUCT — Jelome Ngamuti Portfolio

## Product Overview

A personal portfolio website serving as the central digital presence for Jelome Ngamuti — a software engineer, full-stack developer, and database engineer. The site demonstrates technical capability through its own construction while presenting professional content in an immersive, accessible experience.

---

## Target Audience

| Persona | Needs |
|---|---|
| **Technical Recruiter** | Quick assessment of skills, experience, live project demos, downloadable resume |
| **Engineering Manager** | Depth of technical knowledge, problem-solving approach, system design sensibility |
| **Peer / Collaborator** | Open-source contributions, GitHub activity, technical blog, code quality |
| **Client (freelance)** | Portfolio of shipped work, testimonials, clear contact path |

---

## User Stories

### Must-Have (MVP)

| ID | Story | Acceptance |
|---|---|---|
| US-01 | As a visitor, I want to immediately understand who Jelome is and what he does. | Hero with name, title, value proposition renders within 2s |
| US-02 | As a recruiter, I want to see a categorized list of technical skills. | Skills grid loads with filter by category |
| US-03 | As a hiring manager, I want to browse past projects and see live demos. | Project cards with screenshots, tech badges, demo + GitHub links |
| US-04 | As a visitor, I want to read about Jelome's professional experience. | Timeline with roles, dates, descriptions |
| US-05 | As a recruiter, I want to download a PDF resume. | Resume button triggers download, works on mobile |
| US-06 | As a visitor, I want to contact Jelome easily. | Contact form submits successfully, email sent |
| US-07 | As a visitor, I want to see Jelome's GitHub activity. | Contribution graph + stats load from GitHub API |
| US-08 | As a user, I want the site to work on my phone. | All sections functional at 320px width |
| US-09 | As a user, I want dark/light mode that follows my system preference. | Theme matches `prefers-color-scheme` and persists choice |
| US-10 | As a user with motion sensitivity, I want reduced motion respected. | `prefers-reduced-motion` disables animations |

### Should-Have

| ID | Story | Acceptance |
|---|---|---|
| US-11 | As a visitor, I want to see education and certifications. | Education cards + certification badges with links |
| US-12 | As a visitor, I want to read testimonials. | Testimonial carousel with quote, name, title |
| US-13 | As a recruiter, I want to see measurable achievements. | Animated stats counters (projects, certs, years) |
| US-14 | As a visitor, I want smooth page transitions. | Page changes animate via View Transition API |
| US-15 | As a user, I want to filter projects by technology. | Dropdown/tag filter updates project grid |
| US-16 | As a user, I want to search project content. | Search input filters projects in real-time |

### Could-Have (Post-MVP)

| ID | Story |
|---|---|
| US-17 | As a reader, I want to read technical blog posts. |
| US-18 | As a developer, I want to see Jelome's coding activity (WakaTime). |
| US-19 | As a visitor, I want to see a 3D interactive skill visualization. |
| US-20 | As a user, I want keyboard shortcuts for navigation. |
| US-21 | As a visitor, I want to view the site in French. |

---

## Pages & Content Map

### Home (Single-Page Scroll)

| Section | Content | Interactive Elements |
|---|---|---|
| **Hero** | Name, title, value proposition, photo, CTA | WebGL particle background, typing animation, magnetic buttons |
| **About** | Bio, education, interests, career goals | Scroll-triggered reveals |
| **Skills** | Categorized tech stack grid | Category filter, search |
| **Featured Projects** | 3–6 project cards with screenshots | Filter, search, hover tilt, modal |
| **Experience** | Work history timeline | Expandable entries |
| **Education** | Institution cards | — |
| **Certifications** | Badge grid | External verification links |
| **Achievements** | Stats + milestones | Animated counter on scroll |
| **GitHub Statistics** | Contribution graph, languages, repos | Live API data |
| **Tech Stack** | Logo grid | — |
| **Testimonials** | Quote carousel | Auto-advance, manual controls |
| **Resume** | Download button + preview | PDF download |
| **Contact** | Form + contact info | Validated form, EmailJS |
| **Footer** | Social links, copyright, built-with | — |

### Projects Page (`/projects`)

- Project grid with all projects
- Detailed case study per project (`/projects/[slug]`)
- Each case study: challenge, approach, solution, tech stack, screenshots, links

### About Page (`/about`)

- Extended bio
- Philosophy
- Photography / personal touch

### Contact Page (`/contact`)

- Standalone contact form
- Map (optional)
- Social links

### 404 Page

- WebGL scene consistent with brand
- Clear navigation back to home

---

## Data Model

### Project

```typescript
interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  screenshots: string[];
  technologies: string[];
  category: 'frontend' | 'backend' | 'fullstack' | 'devops' | 'database';
  challenges?: string[];
  solutions?: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  date: string; // ISO date
}
```

### Skill

```typescript
interface Skill {
  name: string;
  category: 'programming' | 'frontend' | 'backend' | 'database' | 'devops' | 'cloud' | 'tools';
  icon?: string;
  level?: number; // 0–100
}
```

### Experience

```typescript
interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string; // null = present
  description: string;
  highlights: string[];
  type: 'internship' | 'freelance' | 'volunteer' | 'academic' | 'full-time';
}
```

### Testimonial

```typescript
interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  avatar?: string;
}
```

---

## Non-Functional Requirements

### Performance Budgets

| Metric | Target |
|---|---|
| First Contentful Paint (FCP) | < 1.5s |
| Largest Contentful Paint (LCP) | < 2.5s |
| Total Blocking Time (TBT) | < 100ms |
| Cumulative Layout Shift (CLS) | < 0.05 |
| Time to Interactive (TTI) | < 3.0s |
| Initial JS bundle | < 150 KB (gzipped) |
| Lighthouse Performance | ≥ 90 |
| WebPageTest fully loaded (3G) | < 3.5s |

### Compatibility

| Dimension | Support |
|---|---|
| Browsers | Chrome 120+, Firefox 120+, Safari 17+, Edge 120+ |
| Mobile | iOS Safari 17+, Android Chrome 120+ |
| Tablet | iPadOS Safari, Android tablet Chrome |
| Screen sizes | 320px – 2560px |

### Accessibility

- WCAG 2.1 Level AA minimum
- Screen reader compatible (NVDA, VoiceOver)
- Full keyboard navigation
- Focus indicators visible
- Color contrast 4.5:1 (text), 3:1 (large text)

### Security

- All forms protected with honeypot + rate limiting
- External links: `rel="noopener noreferrer"`
- No secrets in client-side code
- CSP headers on production
- Form input sanitization

### Reliability

- Graceful degradation when WebGL unavailable
- GitHub API failure → cached fallback data
- Contact form failure → clear error state with alternative contact info
- Offline: static content still readable (no critical JS dependency for text)

---

## Dependencies & External Services

| Service | Purpose | Failure Mode |
|---|---|---|
| GitHub API | Contribution graph, repos, languages | Show cached data; hide section if unavailable |
| EmailJS | Contact form delivery | Show error message; display email directly |
| Vercel | Hosting, ISR, edge functions | Redirect to backup host (Netlify) |
| PostHog | Analytics | Graceful no-op; no breakage |

---

## Success Metrics

| Metric | Target (3 months post-launch) |
|---|---|
| Page views | 500+/month |
| Resume downloads | 10+/month |
| Contact form submissions | 5+/month |
| Avg. session duration | 2:00+ |
| Bounce rate | < 60% |
| GitHub profile visits (referral) | +20% |
| Lighthouse score | 90+ Perf, 95+ A11y |
| Mobile traffic share | 40%+ |

---

## Constraints & Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| WebGL performance on low-end devices | Medium | High | Device tier detection, graceful fallback |
| GitHub API rate limiting | Low | Medium | Aggressive caching (ISR 30 min) |
| EmailJS free tier limits | Medium | Low | Monitor usage, upgrade if needed |
| Browser compatibility (Safari) | Low | Medium | Test on Safari early, polyfill View Transitions |
| Content staleness | Medium | Low | Review cycle every 3 months |
