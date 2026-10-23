# Component Inventory

Build components only when they improve consistency or make behavior easier to test. Avoid creating abstractions for a single trivial element without a clear reuse need.

## Layout

| Component | Responsibility |
|---|---|
| SiteHeader | Identity/wordmark and primary navigation |
| MobileNavigation | Small-screen menu and its accessible state |
| Container | Shared maximum width and page gutters |
| Section | Consistent section spacing and optional anchor ID |
| SiteFooter | Closing navigation and verified external links |

## Content

| Component | Responsibility |
|---|---|
| Hero | Identity, positioning, and primary calls to action |
| SectionHeading | Consistent heading and optional introductory copy |
| ProjectCard | Project name, purpose, contribution/status, technologies, and links |
| ProjectLinks | Source repository and optional verified demo links |
| SkillGroup | Small category of technologies backed by real project use |
| ContactLink | Accessible email or external-profile link |

## Interaction states

- **Navigation link:** default, hover, keyboard focus, active/current section.
- **Mobile menu button:** closed/open, focus-visible, accessible name, aria-expanded, aria-controls.
- **Button/link:** default, hover, active, focus-visible, visited where relevant, and disabled only when a real disabled state exists.
- **Project card:** default and hover/focus treatment; keep actions as individually understandable links. Avoid nested interactive elements.
- **External link:** meaningful accessible label; indicate a new tab in the label or visually/semantically when opening one.
- **Unavailable project/demo:** omit the action or label it accurately; never render a dead link.
- **Copy interaction:** do not add a copy button unless it has a real action and a polite success/failure announcement.

## Component rules

- Use semantic HTML before adding ARIA.
- Use real links for navigation and destinations; use buttons for actions.
- Keep project information data-driven and typed.
- Reuse color, spacing, type, and focus tokens rather than adding component-specific visual values.
- Do not make an entire card clickable if this creates nested links or an unclear keyboard interaction.
- Keep decorative SVGs out of the accessibility tree when they convey no meaning.

## Initial scope exclusions

No contact form, theme switcher, animated cursor, loading overlay, WebGL scene, testimonials component, analytics dashboard, or complex state-management layer by default. Add functionality only for a validated need.
