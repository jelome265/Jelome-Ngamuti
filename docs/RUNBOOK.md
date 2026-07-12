# Runbook — Jelome Ngamuti Portfolio Operations

> **Site:** https://jelomengamuti.dev
> **Deployment:** Vercel (Serverless, auto-deploy from `main`)
> **Stack:** Next.js 16, TypeScript, Three.js, GSAP, Tailwind CSS
> **Last updated:** 2026-07-12

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Development Workflow](#2-development-workflow)
3. [CI/CD Pipeline](#3-cicd-pipeline)
4. [Deployment](#4-deployment)
5. [Monitoring & Observability](#5-monitoring--observability)
6. [Incident Response](#6-incident-response)
7. [Rollback Procedures](#7-rollback-procedures)
8. [Backup & Recovery](#8-backup--recovery)
9. [Performance Tuning](#9-performance-tuning)
10. [Security](#10-security)
11. [Cost Management](#11-cost-management)
12. [On-Call Runbook](#12-on-call-runbook)

---

## 1. Architecture Overview

### Infrastructure Stack

```
Cloudflare CDN (proxied)
  └── Vercel (Edge Network)
       └── Next.js 16 App (Serverless)
            ├── Static pages (ISR/SSG)
            ├── Client components (React)
            ├── WebGL scenes (Three.js / R3F)
            └── Contact form (EmailJS)
```

### Key Dependencies

| Dependency | Purpose | Version |
|---|---|---|
| Next.js | Framework | 16.x |
| React | UI library | 19.x |
| TypeScript | Language | 5.x |
| Three.js | 3D rendering | latest |
| @react-three/fiber | React renderer for Three.js | latest |
| @react-three/drei | R3F utilities | latest |
| GSAP | Scroll + timeline animations | latest |
| Framer Motion | UI mount/unmount animations | latest |
| Lenis | Smooth scrolling | latest |
| Tailwind CSS | Utility-first styling | 4.x |
| EmailJS | Contact form email service | latest |

### Environment Variables

| Variable | Source | Description |
|---|---|---|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS | Contact form service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS | Contact form template ID |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS | Contact form public key |
| `NEXT_PUBLIC_GA_ID` | Google Analytics | (optional) Legacy analytics |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog | Product analytics key |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog | Analytics host |

---

## 2. Development Workflow

### Prerequisites

- Node.js >= 22.0.0
- pnpm >= 9.x

### Setup

```bash
git clone https://github.com/jelome/jelome-ngamuti-portfolio.git
cd jelome-ngamuti-portfolio
pnpm install
cp .env.example .env.local   # fill in secrets
pnpm dev                      # -> http://localhost:3000
```

### Commands

| Command | Action |
|---|---|
| `pnpm dev` | Start dev server with Turbopack |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Lint + type-check |
| `pnpm type-check` | TypeScript check only |
| `pnpm format` | Prettier format all source |

### Branch Strategy

| Branch | Purpose | Deploy target |
|---|---|---|
| `main` | Production-ready code | Production |
| `develop` | Integration branch | (internal) |
| `feat/*` | Feature branches | Vercel Preview |

### Commit Convention

```
<type>(<scope>): <description>

Types: feat | fix | chore | refactor | perf | docs | test | ci
Scopes: hero | about | projects | contact | webgl | seo | a11y | perf | infra
```

---

## 3. CI/CD Pipeline

### Workflows

| Workflow | Trigger | Action |
|---|---|---|
| `ci.yml` | Push / PR to `main`, `develop` | Lint → TypeCheck → Build |
| `lhci.yml` | Push to `main` | Lighthouse CI audit |
| `preview.yml` | PR to `main` | Deploy Vercel preview |

### CI Status (badges)

- **CI:** `![CI](https://github.com/jelome/jelome-ngamuti-portfolio/actions/workflows/ci.yml/badge.svg)`
- **Lighthouse:** `![Lighthouse](https://github.com/jelome/jelome-ngamuti-portfolio/actions/workflows/lhci.yml/badge.svg)`

### Required Checks for Merge

- [x] CI green (lint, typecheck, build)
- [x] Lighthouse regression ≤ 5 pts (if `lhci.yml` enabled)
- [x] Vercel preview deploy successful
- [x] At least 1 human review

---

## 4. Deployment

### Production Deploy

```bash
# Automatic: push to main triggers Vercel auto-deploy
git checkout main
git pull origin main
git merge develop
git push origin main

# Vercel builds + deploys automatically
# Site: https://jelomengamuti.dev
```

### Manual Deploy (emergency)

```bash
vercel --prod
```

### Post-Deploy Verification

```bash
curl -s -o /dev/null -w "%{http_code}" https://jelomengamuti.dev
# Expect: 200

pnpm lhci --collect.url=https://jelomengamuti.dev
```

### Preview Deploys

Every PR automatically creates a Vercel preview URL. Comment
`!preview` on the PR to trigger a fresh deploy.

---

## 5. Monitoring & Observability

### Uptime Monitoring

- **Provider:** Better Stack / Checkly / UptimeRobot
- **Check interval:** Every 5 minutes
- **Regions:** US East, EU West, Asia Southeast
- **Alert on:** 2 consecutive failures
- **Expected:** 99.9% uptime

### Performance Monitoring

- **Lighthouse CI:** On every `main` push
- **WebPageTest:** Manual run before major deploys
- **Thresholds:**
  - Performance ≥ 95
  - Accessibility ≥ 95
  - LCP < 2.5s
  - TBT < 200ms
  - CLS < 0.05

### Analytics

- **Provider:** Plausible (privacy-first)
- **Events tracked:**
  - Pageviews (automatic)
  - Outbound link clicks
  - Contact form submissions
  - Resume downloads
- **Review cadence:** Weekly first month, then monthly

### Error Tracking

- **Vercel Logs:** Real-time serverless function logs
- **Console:** Monitor for client-side errors
- **Action:** Any 5xx > 0.1% in 1 hour triggers investigation

---

## 6. Incident Response

### Severity Levels

| Level | Definition | Response Time |
|---|---|---|
| **P0** | Site down, critical functionality broken | Immediate (< 15 min) |
| **P1** | Major feature broken, degraded UX | < 1 hour |
| **P2** | Minor issue, cosmetic bug | < 24 hours |
| **P3** | Enhancement, low priority | Next sprint |

### Incident Flow

```
Detect (alert / manual)
  → Triage (severity, affected users, blast radius)
  → Respond (mitigate / fix)
  → Resolve (deploy fix, verify)
  → Review (postmortem, action items)
```

### Common Incident Responses

#### Site is down / 502 Bad Gateway

1. Check Vercel status: https://vercel-status.com
2. Check Vercel deployment logs
3. Verify DNS resolution: `dig jelomengamuti.dev`
4. Verify SSL: `curl -I https://jelomengamuti.dev`
5. If Vercel issue → wait for their resolution
6. If deployment issue → revert to last known good commit

#### WebGL crash on page load

1. Reproduce with DevTools console open
2. Check for GPU/driver compatibility errors
3. If widespread → enable static fallback via feature flag
4. If isolated to device → improve device tier detection

#### Contact form not sending

1. Check EmailJS dashboard for quota/rate limits
2. Verify EmailJS environment variables
3. If free tier exhausted → add mailto fallback
4. Upgrade EmailJS plan if needed

#### Performance regression

1. Run Lighthouse CI to confirm regression
2. Profile bundle with `next build --analyze`
3. Check for large unoptimized assets
4. Revert recent bundle changes
5. Re-deploy with fix

---

## 7. Rollback Procedures

### Automated Rollback (Vercel)

```bash
# List recent deployments
vercel list

# Rollback to a specific deployment
vercel rollback <deployment-url-or-id>
```

### Git Revert

```bash
git revert HEAD
git push origin main
# Vercel auto-deploys the revert
```

### Feature Flag Toggle

If the issue is scoped to a feature behind a flag:

1. Toggle flag off in Vercel Environment Variables
2. Re-deploy
3. Fix root cause in feature branch
4. Re-enable flag after fix is deployed

---

## 8. Backup & Recovery

### What Gets Backed Up

| Asset | Method | Frequency |
|---|---|---|
| Source code | GitHub (automatic) | Every push |
| Environment variables | Vercel dashboard + `.env.example` | Manual |
| Analytics data | Plausible (SaaS) | N/A |
| Contact form data | EmailJS (SaaS) | N/A |

### Recovery Procedures

- **Source code loss:** Clone from GitHub
- **Env vars lost:** Restore from `.env.example` + Vault
- **Vercel project lost:** Re-import from GitHub, reconfigure env vars

---

## 9. Performance Tuning

### Build Optimization

- Next.js automatically optimizes images via `next/image`
- Turbopack for fast development HMR
- Code splitting via `React.lazy()` for Three.js scenes
- Font subsetting via `next/font`

### Monitoring Regressions

```bash
# Compare bundle sizes across builds
pnpm build
ls -la .next/static/chunks/ | sort -k5 -rn | head -10

# Check Lighthouse score locally
pnpm lhci --collect.url=http://localhost:3000
```

### Known Performance Levers

| Lever | Impact | Effort |
|---|---|---|
| Reduce WebGL DPR | High perf gain, slight visual loss | Low |
| Remove unused Three.js features | Medium bundle reduction | Medium |
| Lazy-load non-critical sections | Faster initial paint | Low |
| Optimize GLB model size | Faster 3D load | Medium |
| Preload critical fonts | Faster text rendering | Low |

---

## 10. Security

### Current Protections

- **CSP:** Strict Content-Security-Policy headers (configurable in `next.config.ts`)
- **X-Frame-Options:** `DENY` (prevents clickjacking)
- **X-Content-Type-Options:** `nosniff`
- **Referrer-Policy:** `strict-origin-when-cross-origin`
- **SSL:** Auto-provisioned by Vercel (Let's Encrypt)
- **CDN:** Cloudflare proxied (DDoS protection, WAF)
- **Secrets:** Environment variables via Vercel (never in source)

### Security Checklist (Pre-Merge)

- [ ] No secrets, API keys, or tokens in source code
- [ ] No PII in logs or error messages
- [ ] All inputs validated and sanitized
- [ ] Auth checks on any protected routes
- [ ] Dependencies scanned for known CVEs
- [ ] CSP headers appropriate

### Dependency Security

- Lockfile (`pnpm-lock.yaml`) committed and versioned
- Run `pnpm audit` before significant merges
- Dependencies updated monthly

---

## 11. Cost Management

### Monthly Costs

| Service | Tier | Estimated Cost |
|---|---|---|
| Vercel | Hobby (free) | $0 |
| Cloudflare | Free | $0 |
| EmailJS | Free (200 emails/mo) | $0 |
| Plausible | 10k pageviews/mo (free) | $0 |
| Domain | Namecheap / Cloudflare | ~$10/yr |

### Cost Optimization

- All services currently at free tier
- If traffic exceeds free thresholds:
  - Vercel: Upgrade to Pro ($20/mo)
  - Plausible: Self-host on Vercel (free)
  - EmailJS: Upgrade to Basic ($5/mo)

---

## 12. On-Call Runbook

### First 5 Minutes

1. **Acknowledge** the alert
2. **Assess** severity (P0–P3)
3. **Communicate** status to team/stakeholders
4. **Check** Vercel Status: https://vercel-status.com
5. **Check** deployment logs in Vercel dashboard

### Quick Health Checks

```bash
# HTTP status
curl -s -o /dev/null -w "%{http_code}" https://jelomengamuti.dev

# SSL expiry
echo | openssl s_client -connect jelomengamuti.dev:443 2>/dev/null | openssl x509 -noout -dates

# DNS resolution
dig jelomengamuti.dev +short

# Page load timing
curl -o /dev/null -s -w "Time: %{time_total}s\n" https://jelomengamuti.dev
```

### Escalation Contacts

| Role | Contact |
|---|---|
| Developer | Jelome Ngamuti — jelome@example.com |
| Vercel Support | https://vercel.com/support |
| Domain Registrar | Namecheap / Cloudflare support |

### Post-Incident

1. Document timeline and root cause
2. Update runbook with new findings
3. Implement preventive measures
4. Schedule follow-up if needed

---

*This runbook is a living document. Update it whenever you discover
a new failure mode, mitigation, or operational insight.*
