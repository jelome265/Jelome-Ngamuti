# Phase 4 — Homepage Implementation

**Prerequisites:** Phases 1–3 accepted.  
**Deliverable:** The approved design implemented in React/TSX using reusable components, verified content, design tokens, and accessible interactions.

## 1. Build order

Implement in this order so the visual system is established before details multiply:

1. Global stylesheet and theme tokens: color, fonts, spacing, page width, selection/focus treatment, and base typography.
2. Page shell and Container/Section primitives only where useful.
3. SiteHeader and responsive navigation.
4. Hero: positioning copy, actions, and architectural visual.
5. Selected projects and project links driven from typed local data.
6. Technical focus groups.
7. About / working principles.
8. Contact section and footer.
9. Page metadata, favicon, approved social preview image, and factual structured data.
10. Responsive refinements, browser review, and cleanup.

## 2. Component rules

- Follow docs/components.md; avoid premature abstractions.
- Use semantic HTML and native links/buttons before ARIA or custom controls.
- Keep site structure in layout components, complete content bands in sections, and verified copy in typed data modules.
- Keep project state explicit: only show a live demo if its URL is verified and deployed.
- No card may contain nested interactive links or rely on the entire card being clickable.
- Decorative architectural linework should be SVG/CSS, responsive, lightweight, and hidden from assistive technology when it conveys no content.
- Use semantic design tokens instead of unrelated hardcoded values in component files.
- Do not add animation for animation’s sake. Respect prefers-reduced-motion.
- Do not add a contact form, theme switcher, WebGL, animated cursor, testimonials, or external data-fetching flow without a reviewed requirement.

## 3. Visual implementation rules

- Match the composition approved in homepage-design.md.
- Preserve a clear H1, section headings, and reading order.
- Use the light background as the default. Reserve the dark surface for the contact section or another explicitly approved contrast use.
- Use Cinzel sparingly for display text; Inter for content/UI; mono for short technical labels.
- Maintain restrained lines, square/low-radius cards, generous spacing, and minimal shadows.
- Do not add faux parchment textures, ornate borders, fantasy imagery, arbitrary statistics, skill bars, or badges that were not part of the approved design.
- Ensure layout responds to content length rather than relying on fixed heights or exact viewport assumptions.

## 4. Responsive implementation

- Mobile: one-column sections, compact mobile menu, stacked project cards and actions, no horizontal scrolling.
- Tablet: collapse layouts based on readable text width; project cards can use two columns when appropriate.
- Desktop: align to the 1200px max-width and approved grid.
- Keep DOM order consistent with the intended reading order.
- Check long project titles, long technology names, missing optional links, and empty optional content.
- No critical content may depend on hover, animation, or JavaScript scroll effects.

## 5. Navigation behavior

- Every navigation link targets a real section ID.
- The menu button exposes aria-expanded and aria-controls accurately.
- The mobile menu closes after selecting a section and on Escape; Escape returns focus to the menu trigger.
- Keyboard focus stays visible and follows logical document order.
- Buttons perform actions; links navigate. Do not style a nonfunctional element as interactive.

## 6. Performance and implementation restraint

- Prefer CSS/SVG for the simple hero graphic over a large image or animation library.
- Optimize approved project images and include useful alternative text.
- Avoid loading unused font weights and unnecessary third-party scripts.
- Do not query GitHub at runtime for cards or statistics; static typed data must still render if the network is slow or unavailable.
- Remove unused starter/demo files and dependencies after confirming they are not needed.

## 7. Phase 4 acceptance criteria

- [ ] All seven sections match the approved design and order.
- [ ] Only Phase 2-approved facts and links appear in published content.
- [ ] Projects are rendered from typed local data.
- [ ] Desktop, tablet, and mobile layouts are implemented.
- [ ] Navigation and all links have working, accessible interaction states.
- [ ] Design tokens are centralized and consistently used.
- [ ] No prohibited placeholder, fake metrics, or dead interactions remain.
- [ ] TypeScript, lint, and production build continue to pass.
