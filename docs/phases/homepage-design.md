# Phase 1 — Homepage Design

**Status:** Proposed for review  
**Purpose:** Decide the actual homepage composition for desktop and mobile before scaffolding or coding it.

## 1. Design direction

**Clean · Medieval-inspired · Professional**

The medieval influence comes from editorial serif headings, measured symmetry/asymmetry, architectural alignment, thin rules, numbered references, and restrained bronze accents. The site must read as a contemporary developer portfolio—not a fantasy interface, game UI, faux parchment, or historical costume.

Use the approved baseline in ../design-tokens.md:
- Background #F7F5F0; surface #FFFFFF; foreground #24231F.
- Muted text #716D64; borders #D8D2C6; accent #795B36; accent hover #5D4328.
- Cinzel for selected display headings; Inter for body and UI; JetBrains Mono only for small technical labels.
- 1200px maximum content width; 48px desktop, 32px tablet, and 20px mobile gutters.
- 1px rules, 4px default corner radius, restrained shadows, and 150–200ms transitions.

Check real text/color pairs before release; the palette is a design baseline, not proof that every pairing meets contrast requirements.

## 2. Homepage structure

Use one scrollable page with section anchors. Do not add separate routes, a blog, a résumé download, a contact form, theme switcher, or animation-heavy effects to the initial release.

Section order:
1. Site header and navigation.
2. Hero.
3. Selected projects.
4. Technical focus.
5. About / working principles.
6. Contact.
7. Footer.

This order makes identity and the work visible before background details. Keep every section in the document; do not hide important material behind hover or animation.

## 3. Desktop layout (1024px and above)

Use a centered 1200px content container with 48px outer gutters and a 12-column grid. Align section headings and card edges consistently. Use generous space between sections (typically 96px, adjustable after rendering); internal card spacing follows the design-token scale.

### Header
- Single horizontal row on the page background, separated from the content by a thin bottom rule.
- Full name, “Jelome Ngamuti”, at left as the wordmark/home link.
- Inline links at right: Home, Projects, About, Contact.
- GitHub may appear as a compact text link aligned with navigation if the row remains uncluttered.
- Do not make the header sticky for the first version; avoid a persistent overlay and keep the top composition calm.

### Hero
- Two-column editorial layout, approximately 7 columns of text and 5 columns of visual material, vertically centered with generous whitespace.
- Left column: small uppercase mono eyebrow; H1 “Jelome Ngamuti”; concise positioning line; short supporting sentence; two actions.
- Proposed positioning copy: “Computer Science student focused on building reliable software.” Verify it still describes the public profile before release.
- Primary action: “Explore selected work” → #projects.
- Secondary action: “GitHub profile” → https://github.com/jelome265.
- Right column: a restrained architectural diagram built from CSS/SVG rules and typography, titled “Design / Build / Verify”, with three numbered stages and a central alignment axis. It is an explanatory visual, not a fake terminal, metrics dashboard, or claim of completed work. Hide purely decorative geometry from assistive technology.
- H1 is the page’s single H1. Use a strong serif display face; keep the supporting copy in Inter and below 720px reading measure.

### Selected projects
- Section ID: projects.
- Section heading and one short explanatory line; an optional mono section number sits on the same baseline.
- Up to three featured projects in a three-column grid with equal visual weight. At 1024px, allow a two-column grid if the text would be cramped.
- Card composition: top rule; project index (01/02/03) and verified status/category; project title; short purpose/problem summary; brief personal contribution or technical decision; technology names as secondary metadata; explicit repository and optional live-demo links.
- Use no full-card nested links, rating bars, floating badges, or decorative technology-logo wall. Cards are rectangular and defined by rules, alignment, and whitespace rather than heavy shadows.
- Actual projects, titles, statuses, technologies, and links are selected and verified in Phase 2. Do not ship example or placeholder content.

### Technical focus
- Use a two-column editorial section: short explanatory introduction on one side and two or three compact topic groups on the other.
- Group names describe areas of work, not skill percentages. Examples may include software engineering, web development, and systems/reliability only where Phase 2 evidence supports them.
- Each technology or topic should connect to a real project or learning activity. Omit unsupported proficiency claims.

### About / working principles
- Use a split layout with a narrow heading column and readable text column.
- Keep biography concise: current study/context, what kinds of software the developer is working to build, and a small set of engineering principles.
- Include only personal information intentionally approved for public display. Do not expose sensitive family, financial, or private circumstances.
- Avoid invented employment history, testimonials, awards, or quantified impact.

### Contact and footer
- Contact is the final visual anchor: a dark foreground surface (#24231F) with light text (#F7F5F0), a clear invitation, and verified email/GitHub links.
- Do not add a form in the initial release. The email destination must be verified in Phase 2.
- Footer returns to the light page background or is a simple continuation of the dark contact area; include name, GitHub, and concise section links. No decorative badge strip.

## 4. Mobile layout (0–639px)

Use 20px gutters and a single-column reading order. The DOM order remains identical to the desktop order.

### Header and navigation
- One compact row: name/wordmark left and a menu button right.
- Menu button has an accessible name, aria-expanded, and aria-controls that reference the menu it controls.
- When open, show a plain vertical list of Home, Projects, About, and Contact in a high-contrast surface. Menu links must be comfortably tappable.
- Close the menu after selecting a section and on Escape; restore focus to the trigger when Escape closes it.
- Do not require hover, use tiny icon-only links without accessible names, or place navigation over text.

### Hero
- Stack eyebrow, H1, positioning statement, supporting copy, and actions vertically.
- H1 scales fluidly and wraps naturally; do not force a single line.
- Stack actions when necessary; preserve a clear primary/secondary distinction without horizontal overflow.
- Place the architectural diagram below the copy, simplified to a vertical sequence. If it adds clutter at narrow widths, reduce its visual detail—not its essential text.

### Projects and remaining sections
- Project cards stack in a single column. Do not compress three cards into horizontally scrolling carousels.
- Technical-focus groups stack in reading order.
- About becomes one column.
- Contact actions stack or wrap cleanly. Footer links wrap without overflow.
- Use 24–32px between related blocks and approximately 64px between major sections as a starting point.
- Keep essential content visible without requiring animation or interaction.

## 5. Tablet behavior (640–1023px)

Use 32px gutters. At 640–767px, keep the hero stacked and project cards in one column. From 768px upward, use a two-column hero only if both columns remain readable; use two project columns where suitable. Collapse layouts based on content fit, not on a particular screenshot.

## 6. Visual hierarchy and interaction

Priority, from strongest to quietest:
1. H1 and positioning statement.
2. Primary “Explore selected work” action.
3. Project titles and project summaries.
4. Section headings and contact call to action.
5. Secondary metadata, technology lists, dates, and labels.

Interaction states:
- Links: default, hover, active, and visible keyboard focus.
- Mobile navigation: closed/open and keyboard-close behavior.
- Project links: clear source/demo labels; omit unavailable destinations.
- Motion: color/opacity or minimal position transitions only; respect prefers-reduced-motion.
- Use semantic links for navigation and buttons only for actions.

## 7. Content and asset constraints

- Phase 2 must establish the final featured-project order and factual copy.
- Proposed projects such as Sitolo, Rustacean, and Ciee’s Fashion Sense are candidates for review, not automatically approved homepage content. Confirm each project's public status, scope, contribution, and repository before inclusion.
- Do not use fake statistics, progress meters, fabricated testimonials, invented client outcomes, or unverified external links.
- A portrait is not required. Add a real portrait or project screenshot only if it helps visitors understand the work, the asset is approved, and it is appropriately optimized.
- Fonts should be self-hosted only if licensing, file availability, and performance justify it; otherwise use reliable fallbacks.

## 8. Wireframe summary

Desktop:
- Header: name at left | navigation and GitHub at right
- Hero: identity, positioning, two actions (left) | “Design / Build / Verify” architectural visual (right)
- Projects: three editorial cards across; two columns at narrower desktop widths
- Technical focus: explanatory text (left) | evidence-backed topic groups (right)
- About: section heading (left) | concise biography and working principles (right)
- Contact: dark, high-contrast band with verified contact links
- Footer: name and concise navigation

Mobile:
- Header: name | menu button
- Hero: stacked text and actions, then simplified architectural visual
- Projects: vertically stacked cards
- Technical focus: stacked topic groups
- About: one-column text
- Contact: stacked copy and contact links
- Footer: wrapped links

## 9. Phase 1 acceptance criteria

- [ ] Desktop and mobile compositions in this document are reviewed and approved.
- [ ] Section order and primary actions are agreed.
- [ ] Final project selection is explicitly deferred to Phase 2.
- [ ] Token values remain consistent with ../design-tokens.md or any changes are documented there.
- [ ] No implementation begins until the homepage composition is approved.
