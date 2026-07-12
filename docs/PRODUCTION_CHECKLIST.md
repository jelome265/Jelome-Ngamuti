# Production Go-Live Checklist — Jelome Ngamuti Portfolio

> **Canonical URL:** https://jelomengamuti.dev
> **Last updated:** 2026-07-12
>
> This checklist gates the production launch. Every box must be verified
> before pushing to `main` for the initial deploy. Mark each item `[x]` as
> it passes.

---

## Pre-Launch

### Phase Completion

- [ ] Phase 0 — Foundation: skeleton, routing, design tokens, a11y baseline
- [ ] Phase 1 — Hero & Motion Background: WebGL particles, typing animation, CTAs
- [ ] Phase 2 — Core Sections: About, Skills, Experience, Education, scroll reveals
- [ ] Phase 3 — Projects & GitHub: Bento grid, filtering, case studies, live stats
- [ ] Phase 4 — Testimonials, Resume & Contact: Social proof, form, resume download
- [ ] Phase 5 — Polish & Modern Features: Transitions, easter eggs, SEO, 404
- [ ] Phase 6 — QA, Testing & Launch: Cross-browser, perf, a11y audit, go-live

### Code Quality Gates

- [ ] Zero `style={}` inline CSS verified:
      `rg 'style=\{(' src/` returns **0 matches**
- [ ] `pnpm lint` — **zero errors**
- [ ] `pnpm typecheck` — **zero errors**
- [ ] `pnpm build` — production build succeeds
- [ ] No `TODO`/`FIXME`/`HACK` without an attached ticket
- [ ] All `.ts` and `.tsx` files pass strict TypeScript checks
- [ ] Commit messages follow Conventional Commits

### Performance Budget

| Metric | Target | Status |
|---|---|---|
| Lighthouse Performance | ≥ 95 | |
| Lighthouse Accessibility | ≥ 95 | |
| LCP | < 2.5s | |
| TBT | < 200ms | |
| CLS | < 0.05 | |
| First Load JS (gzipped) | < 150 KB | |
| Speed Index | < 2.0s | |
| WebPageTest (3G) fully loaded | < 5s | |

### Cross-Browser Testing

| Browser | Status |
|---|---|
| Chrome 120+ | |
| Firefox 120+ | |
| Safari 17+ | |
| Edge 120+ | |
| Brave | |
| Samsung Internet | |

**Test procedures:** Load → scroll all sections → click all interactive elements →
form submit → 404 page → keyboard tab navigation.

### Mobile Testing

| Device | Browser | Status |
|---|---|---|
| iPhone 14/15 | Safari | |
| Android Pixel 7 | Chrome | |
| iPad / tablet | Safari | |
| Foldable / small (375px) | Chrome | |

**Pass criteria:** No layout shift, all CTAs tappable, no WebGL crash,
form submits, resume downloads, landscape orientation OK.

### Accessibility Audit

| Criterion | Tool / Method | Pass / Fail |
|---|---|---|
| All images have `alt` | axe-core, manual review | |
| Heading hierarchy h1→h2→h3 | axe-core | |
| Color contrast ≥ 4.5:1 | axe-core + manual | |
| Focus visible on all interactive | Tab through page | |
| Skip-to-content link | Tab on first load | |
| Reduced motion respected | Enable OS setting → no GSAP/Three.js | |
| Screen reader — all sections read | VoiceOver / NVDA | |
| Form error association via `aria-describedby` | axe-core | |
| ARIA labels on icon-only buttons | Manual review | |

### Reduced Motion Verification

- [ ] `prefers-reduced-motion: reduce` enabled in DevTools
- [ ] No GSAP `gsap.to()` animations run
- [ ] Three.js WebGL canvases unmount (return null from hook)
- [ ] Scroll-triggered reveals happen instantly (no fade-in)
- [ ] Text scramble returns final text immediately
- [ ] All transitions skip
- [ ] Normal interaction still works (scroll, click, form)
- [ ] Every animated component reads `useReducedMotion()` early-return guard

### Functional Testing

- [ ] 404 page renders correctly (visit `/nonexistent`)
- [ ] Contact form sends (test with real submission)
- [ ] Email delivers to inbox (not spam folder)
- [ ] Resume PDF download works
- [ ] OG image renders on social share debugger
- [ ] All section components render without console errors
- [ ] JSON-LD structured data visible in page source
- [ ] `ai.txt` and `llms.txt` accessible at `/ai.txt` and `/llms.txt`

### SEO & Metadata

- [ ] `robots.txt` returns `Allow: /` at `/robots.txt`
- [ ] `sitemap.xml` accessible and valid at `/sitemap.xml`
- [ ] Canonical URL set to `https://jelomengamuti.dev`
- [ ] Meta description present on every page
- [ ] Open Graph tags present and correct
- [ ] Twitter Card tags present and correct
- [ ] Structured data (JSON-LD) in page source
- [ ] SEO metadata present in page source

### Infrastructure

- [ ] Domain registered: `jelomengamuti.dev`
- [ ] DNS pointed to Vercel (A / CNAME records)
- [ ] SSL certificate valid (no mixed content)
- [ ] Custom domain resolves: `curl -I https://jelomengamuti.dev` returns 200
- [ ] CDN: Cloudflare proxied (orange cloud) for DDoS + cache
- [ ] Static assets: 1-year immutable cache header
- [ ] HTML: no-cache (revalidate on deploy)
- [ ] Analytics: Plausible configured and verified

---

## Launch Day

1. [ ] Final `pnpm build && pnpm start` verification on production-like environment
2. [ ] Deploy to Vercel via `main` branch push
3. [ ] Verify custom domain resolves with valid SSL
4. [ ] Submit sitemap to Google Search Console
5. [ ] Submit sitemap to Bing Webmaster Tools
6. [ ] Test social share cards via OpenGraph debugger
7. [ ] Test social share cards via Twitter Card validator
8. [ ] Run Lighthouse from PageSpeed Insights (live URL)
9. [ ] Monitor Vercel logs for first 24 hours — no 5xx errors
10. [ ] Add website to Plausible analytics, verify pageview fires

---

## Post-Launch

- [ ] Set up uptime monitoring (Better Stack, Checkly, or UptimeRobot)
- [ ] Schedule monthly Lighthouse regression run
- [ ] Review analytics weekly first month, then monthly
- [ ] Monitor contact form deliverability
- [ ] Plan v2 features: blog (MDX), dark mode toggle, i18n

---

## Rollback Triggers

| Condition | Action |
|---|---|
| 5xx errors > 0.1% in first hour | Revert deploy, restore previous `main` |
| Lighthouse regression > 10 pts on any metric | Revert, profile with LHCI, fix, re-deploy |
| Contact form not delivering | Switch to mailto fallback, investigate provider |
| SSL certificate invalid | Verify DNS, re-provision via Vercel |
| WebGL crash on mobile > 5% of sessions | Feature-flag WebGL scenes to static fallback |
