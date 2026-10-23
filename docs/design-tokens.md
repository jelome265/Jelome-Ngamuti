# Design Tokens

The tokens below establish a consistent baseline. Tune them only after reviewing rendered screens and checking contrast.

## Color palette (revision 2: monochrome)

Revision 2 replaces the warm bronze palette (revision 1) with the monochrome palette from the Dopely and Dyslove palette references. Revision 1 values are kept below for history.

| Token | Value | Name | Intended use |
|---|---|---|---|
| Background | #E9ECEF | Whiteout | Main page background |
| Surface | #FFFFFF | Clean White | Cards and raised content surfaces |
| Foreground | #111111 | True Black | Primary text and headings |
| Muted | #343434 | Soft Graphite | Secondary text (#777777 fails AA on the background) |
| Border | #D6D6D6 | Pale Silver | Rules and dividers |
| Accent | #343434 | Soft Graphite | Links, primary action fill, eyebrow labels |
| Accent hover | #111111 | True Black | Hover/active accent |
| Dark surface | #111111 | True Black | Contact band |
| Dark text | #FFFFFF | Clean White | Text on the dark surface |
| Dark-surface accent | #D6D6D6 | Pale Silver | Accent on dark surfaces |
| Focus | #111111 | True Black | Keyboard focus on light surfaces; Clean White on dark surfaces |

Contrast (WCAG 2.x), measured for these pairings: True Black on Whiteout 15.9:1; True Black on Clean White 18.9:1; Soft Graphite on Whiteout 10.5:1; Clean White on Soft Graphite 12.5:1; Pale Silver on True Black 13.0:1. Pale Silver rules on Whiteout measure 1.2:1; they are decorative dividers, not the only indicator of a boundary. Re-check before release.

Revision 1 (superseded): background #F7F5F0, surface #FFFFFF, foreground #24231F, muted #716D64, border #D8D2C6, accent #795B36, accent hover #5D4328, dark surface #24231F, dark text #F7F5F0, dark-surface accent #C4A574, focus #245DAB.

Do not communicate state through color alone. Verify final foreground/background pairs with a contrast checker before release; use WCAG AA as the minimum.

## Typography

| Role | Family | Weight | Guidance |
|---|---|---|---|
| Display/headings | Cinzel, Georgia, serif | 500–600 | Use selectively for a restrained medieval influence |
| Body/UI | Inter, Arial, sans-serif | 400–600 | Default for readability and navigation |
| Technical labels/code | JetBrains Mono, monospace | 400–500 | Use for short technical metadata, not long paragraphs |

Prefer self-hosted font files when licensing and asset availability permit; always define system fallbacks. Avoid loading unnecessary weights.

Type scale:
- Body: 16px / 1.7 line-height.
- Small/supporting text: 14px / 1.5.
- H1: clamp(2.5rem, 6vw, 4.5rem).
- H2: clamp(1.8rem, 4vw, 2.75rem).
- H3: 1.25rem–1.5rem.
- Eyebrow/technical label: 12px–13px with restrained letter spacing.

Long-form text should use a comfortable line length of approximately 60–75 characters.

## Spacing scale

Use an 8px-based scale with a 4px half-step:
- 1: 4px
- 2: 8px
- 3: 12px
- 4: 16px
- 6: 24px
- 8: 32px
- 12: 48px
- 16: 64px
- 24: 96px
- 32: 128px

Use consistent section spacing and let smaller screens reduce outer spacing without compressing line-height.

## Layout

- Maximum content width: 1200px.
- Reading measure: 720px.
- Desktop page gutters: 48px.
- Tablet page gutters: 32px.
- Mobile page gutters: 20px.
- Desktop grid: 12 columns.
- Tablet grid: 6 columns.
- Mobile grid: 4 columns.
- Default border width: 1px.
- Default radius: 4px; favor architectural edges over pill-shaped cards.
- Shadows: minimal and only when they clarify hierarchy.

## Breakpoints

- Small/mobile: 0–639px.
- Tablet: 640–1023px.
- Desktop: 1024–1279px.
- Wide desktop: 1280px and above.

Use responsive utilities when possible; add custom media queries only for behavior that cannot be expressed cleanly in utilities.

## Motion

- Standard transition: 150–200ms.
- Prefer changes to color, opacity, and small positional shifts.
- Avoid parallax and continuous decorative motion.
- Honor prefers-reduced-motion.

## Tailwind implementation

Use Tailwind CSS v4's CSS-first setup. Define design values through CSS theme variables in the main stylesheet and reuse semantic tokens consistently. Avoid maintaining a duplicate set of unrelated hard-coded colors in component files.
