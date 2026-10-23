# Design Tokens

The tokens below establish a consistent baseline. Tune them only after reviewing rendered screens and checking contrast.

## Color palette

| Token | Value | Intended use |
|---|---|---|
| Background | #F7F5F0 | Main page background |
| Surface | #FFFFFF | Cards and raised content surfaces |
| Foreground | #24231F | Primary text |
| Muted | #716D64 | Secondary text and supporting labels |
| Border | #D8D2C6 | Rules, dividers, and card borders |
| Accent | #795B36 | Primary links and restrained highlights on light surfaces |
| Accent hover | #5D4328 | Hover/active accent on light surfaces |
| Dark surface | #24231F | Optional dark contrast section |
| Dark text | #F7F5F0 | Text on the dark surface |
| Dark-surface accent | #C4A574 | Accent on dark surfaces |
| Focus | #245DAB | Keyboard focus indicator |

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
