# Phase 6: QA, Testing & Launch (Days 27–30)

**Goal:** Production-ready verification, cross-browser confidence, deployment. **No `style={}` inline CSS.**

**Dependencies:** All prior phases

---

## File Tree

```
.github/
└── workflows/
    ├── ci.yml                          # Lint, type-check, build, test on push/PR
    ├── lhci.yml                        # Lighthouse CI on main
    └── preview.yml                     # Vercel preview deploy
scripts/
└── verify.sh                           # Pre-launch regression checks
docs/
├── PRODUCTION_CHECKLIST.md             # Final go-live gate
└── RUNBOOK.md                          # Ops procedures
```

---

## Task 6.1 — CI Pipeline

### .github/workflows/ci.yml

```yaml
name: CI
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22', cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm build
```

### .github/workflows/lhci.yml

```yaml
name: Lighthouse CI
on: [push]
jobs:
  lhci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22', cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - run: pnpm lhci --collect.staticDistDir=./out
```

---

## Task 6.2 — Mobile Testing Checklist

Manual verification on:

| Device | Test Items |
|---|---|
| iPhone 14/15 (Safari) | Scroll, tap targets, form, cursor hidden, Three.js loads |
| Android Pixel 7 (Chrome) | Same as above + landscape orientation |
| iPad / tablet (Safari) | Layout breakpoints, sidebar, tap |
| Foldable / small (375px) | Hero text readability, nav collapse, no horizontal scroll |

**Pass criteria:** No layout shift, all CTAs tappable, no WebGL crash, form submits, resume downloads.

---

## Task 6.3 — Accessibility Audit

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
| ARIA labels on icon-only buttons | manual review | |

---

## Task 6.4 — Reduced Motion Verification

1. Enable `prefers-reduced-motion: reduce` in DevTools
2. Verify:
   - No GSAP `gsap.to()` animations run
   - Three.js WebGL canvases unmount (return null from hook)
   - Scroll-triggered reveals happen instantly (no fade-in)
   - Text scramble returns final text immediately
   - All transitions skip
   - Normal interaction still works (scroll, click, form)

**Implementation check:** Every animated component reads `useReducedMotion()` early-return guard.

---

## Task 6.5 — Browser Testing Matrix

| Browser | Status |
|---|---|
| Chrome 120+ | Pass |
| Firefox 120+ | Pass |
| Safari 17+ | Pass |
| Edge 120+ | Pass |
| Brave | Pass |
| Samsung Internet | Pass |

Test per browser: load → scroll all sections → click all interactive elements → form submit → 404 page → keyboard tab.

---

## Task 6.6 — Performance Budget Verification

Run Lighthouse and WebPageTest. Targets:

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | ≥ 95 |
| LCP | < 2.5s |
| TBT | < 200ms |
| CLS | < 0.05 |
| First Load JS (gzipped) | < 150 KB |
| Speed Index | < 2.0s |
| WebPageTest (3G) | Fully loaded < 5s |

---

## Task 6.7 — Infrastructure & Hosting

1. Domain: register `jelomengamuti.dev` via Cloudflare or Namecheap
2. DNS: point `A` / `CNAME` to Vercel (or deploy to Vercel with custom domain)
3. Vercel settings:
   - Framework: Next.js 16
   - Build: `pnpm build`
   - Output: Serverless
   - Region: auto (closest to visitor)
4. CDN: Cloudflare proxied (orange cloud) for DDoS + fast cache
5. SSL: Vercel auto-provisions via Let's Encrypt (or Cloudflare Full Strict)
6. Caching:
   - Static assets (fonts, images): 1-year immutable cache
   - HTML: no-cache (revalidate on deploy)
7. Analytics: Plausible (self-hosted or cloud) — privacy-first, no GDPR issues

---

## Task 6.8 — Go-Live Checklist

### Pre-launch

- [ ] All 6 phases fully implemented
- [ ] Zero `style={}` inline CSS (verified via grep: `rg 'style=\{(' src/`)
- [ ] `pnpm lint` — zero errors
- [ ] `pnpm typecheck` — zero errors
- [ ] `pnpm build` — production build succeeds
- [ ] Lighthouse scores all ≥ 90
- [ ] Cross-browser test pass (Chrome, Firefox, Safari, Edge)
- [ ] Mobile test pass (iOS Safari, Android Chrome)
- [ ] Screen reader (VoiceOver) test pass
- [ ] Reduced motion toggle respected
- [ ] 404 page renders correctly
- [ ] Contact form sends (test with real submission)
- [ ] Email delivers to inbox (not spam)
- [ ] Resume PDF download works
- [ ] OG image renders on social share debugger
- [ ] Custom domain DNS propagated (`dig jelomengamuti.dev`)
- [ ] SSL certificate valid (no mixed content)
- [ ] robots.txt returns `Allow: /`
- [ ] sitemap.xml submitted to Google Search Console
- [ ] JSON-LD structured data visible in page source
- [ ] ai.txt and llms.txt accessible
- [ ] Full page load on 3G < 5s

### Launch Day

1. Final `pnpm build && pnpm start` verification on production-like environment
2. Deploy to Vercel via `main` branch push
3. Verify custom domain resolves with SSL
4. Submit sitemap to Google Search Console + Bing Webmaster Tools
5. Test social share cards via OpenGraph debugger and Twitter Card validator
6. Run Lighthouse from PageSpeed Insights (live URL)
7. Monitor Vercel logs for first 24 hours — no 5xx errors
8. Add website to Plausible analytics, verify pageview fires

### Post-Launch

- Set up uptime monitoring (Better Stack, Checkly, or UptimeRobot)
- Schedule monthly Lighthouse regression run
- Review analytics weekly first month, then monthly
- Monitor contact form deliverability
- Plan v2 features: blog (MDX), dark mode toggle, i18n

---

## Acceptance Criteria

| Criterion | Verification |
|---|---|
| Zero inline `style={}` across repo | `rg 'style=\{(' src/` returns 0 matches |
| CI green on push/PR | GitHub Actions pass |
| Lighthouse ≥ 95 on Performance, Accessibility | CI artifact |
| WebPageTest fully loaded < 5s on 3G | WebPageTest result |
| All forms submit and validate | Manual |
| All section components render without error | Console check |
| 404 page loads with WebGL scene | Visit `/nonexistent` |
| Reduced motion renders static page | OS setting toggle |
| SEO metadata present in page source | View page source |
| Custom domain resolves with valid SSL | `curl -I https://jelomengamuti.dev` returns 200 |
| sitemap submitted to Google | Search Console verified |
| Analytics pageview fires on load | Plausible dashboard |
