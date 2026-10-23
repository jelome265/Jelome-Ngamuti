# Phase 5 — Verification and Deployment

**Prerequisites:** Phase 4 implementation complete and the selected deployment target is known.  
**Deliverable:** A verified production deployment with working links, responsive behavior, accessibility checks, and accurate metadata.

## 1. Automated checks

Run the scripts that actually exist in package.json; add missing checks only when justified. The expected baseline is:

- Install: npm ci.
- TypeScript validation.
- Lint.
- Production build.
- Test suite, if component/interaction tests were introduced.

The production build must finish without errors. Review warnings and resolve meaningful ones rather than treating a green exit code as complete verification.

## 2. Responsive manual review

Check the deployed or production-preview build at:
- 320px and 375px mobile widths.
- 640px and 768px tablet boundaries.
- 1024px and 1280px desktop boundaries.
- 1440px or wider desktop.

At each relevant size, verify:
- No horizontal overflow, clipped content, or awkward heading wraps.
- Navigation, project cards, CTA buttons, contact links, and footer remain usable.
- The page does not rely on a fixed viewport height.
- At 200% browser zoom, content reflows without loss of essential information or functionality.
- Images have appropriate dimensions, alt text, and loading behavior.

Use actual browsers and real rendering; source inspection alone cannot confirm layout quality.

## 3. Accessibility review

- Keyboard-only review from the first focusable element through the footer.
- Skip-to-content link becomes visible on focus.
- Focus-visible states are clear and never removed without a stronger replacement.
- Mobile navigation exposes and updates its state; Escape closes it and returns focus to the trigger.
- Headings and landmarks form a sensible hierarchy; links/buttons have meaningful accessible names.
- Verify final color pairings against WCAG AA: 4.5:1 for normal text, 3:1 for large text and meaningful UI components/graphics.
- Check with prefers-reduced-motion enabled.
- Inspect image alternatives and decorative elements.
- Use an automated accessibility scanner as a supplement, not the only evidence.

## 4. Functional and content checks

- Every section link resolves to an existing ID.
- All GitHub, repository, demo, email, and social links are checked from the deployed site.
- No broken, private, stale, or placeholder destinations appear.
- Current project statuses and technologies match the Phase 2 evidence.
- No fake performance numbers, client outcomes, testimonials, unverified jobs, or unsupported skills appear.
- No secrets, private information, or local development paths leak into the built output.
- The browser console has no application errors; network requests do not fail unexpectedly.

## 5. SEO and sharing metadata

- Confirm title, description, language, viewport, favicon, theme color, and canonical URL in rendered HTML.
- Canonical must use the intended production domain, never a preview URL.
- Open Graph and X/Twitter card metadata use absolute public URLs and consistent copy.
- Social preview asset loads anonymously and is legible when reduced to preview size; test the actual deployed URL.
- Validate JSON-LD syntax and only include claims visible and approved on the page.
- Ensure the site is not accidentally blocked by noindex or robots.txt rules.
- Check sitemap and robots.txt only if they are implemented and intended.

## 6. Performance review

Measure the deployed build instead of claiming performance before a measurement exists. Use Lighthouse/PageSpeed and a browser network panel to inspect:
- Largest Contentful Paint, Interaction to Next Paint, and Cumulative Layout Shift.
- JavaScript/CSS/image/font payloads.
- Blocking third-party resources and failed asset requests.
- Console warnings and runtime errors.

Treat performance targets as measured release criteria; document the measurement date, URL, device/network profile, and results if recording a score.

## 7. Deployment procedure

1. Confirm production build and all checks pass locally or in CI.
2. Deploy a preview/staging build.
3. Run the responsive, accessibility, link, and metadata checks against that preview.
4. Confirm build command and output directory match the host; for a standard Vite build these are npm run build and dist/.
5. Confirm the custom domain and redirects, if configured, work as expected.
6. Deploy production and repeat smoke checks on the canonical URL.
7. Record the deployment URL and commit SHA. Keep Git history intact; use a follow-up fix/redeploy or host rollback if needed.

The existing domain candidate is https://jelomengamuti.pages.dev/. Verify ownership, actual host configuration, production behavior, and canonical choice before relying on it. Do not claim deployment succeeded until the deployed site is checked.

## 8. Definition of done

- [ ] All expected automated checks pass.
- [ ] Responsive tests pass at the listed sizes and 200% zoom.
- [ ] Keyboard and accessibility review passes; contrast pairs are measured.
- [ ] All page and external links are verified.
- [ ] Metadata and social previews are correct on the live URL.
- [ ] No console errors, missing assets, placeholder content, or unsupported claims remain.
- [ ] Deployment URL and tested commit SHA are recorded.
- [ ] Any known limitations are explicitly documented instead of hidden.
