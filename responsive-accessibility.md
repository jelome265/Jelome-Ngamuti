# Responsive Design and Accessibility

## Responsive behavior

### Mobile: 0–639px
- Use 20px page gutters.
- Stack hero content, project cards, and content groups vertically.
- Replace inline navigation with a compact menu button.
- Keep primary actions easy to tap and avoid relying on hover.
- Prevent horizontal overflow, clipped headings, and tiny metadata.
- Keep text at a readable size; do not shrink body copy to preserve a desktop composition.

### Tablet: 640–1023px
- Use 32px page gutters.
- Use two-column project layouts only when each column remains readable.
- Keep section spacing and line length controlled.

### Desktop: 1024px and above
- Use 48px gutters up to the 1200px content maximum.
- Use grid asymmetry and architectural alignment sparingly.
- Preserve a clear reading order when layouts become multi-column.

### Reflow
- The page must work at 320 CSS pixels wide and at 200% zoom.
- No essential information or action may depend on a fixed viewport height.
- Content order in the DOM must remain meaningful when CSS columns collapse.
- Images must scale within their containers and have appropriate aspect ratios.
- Do not make hover the only way to reveal information.

## Keyboard and semantics

- Include a visible-on-focus “Skip to content” link.
- Use semantic header, nav, main, section, and footer landmarks.
- Maintain a logical heading hierarchy without skipping levels for visual styling.
- Every interactive element must be reachable and operable by keyboard.
- Provide an obvious focus-visible indicator; do not remove the browser outline without a stronger replacement.
- Mobile navigation must expose its state and be usable by keyboard, touch, and assistive technology.
- Focus order must follow the intended reading and interaction order.
- External links must have clear names and predictable behavior.

## Contrast and visual access

- Meet WCAG AA contrast: at least 4.5:1 for normal text and 3:1 for large text and meaningful UI graphics.
- Never use color as the only indication of state.
- Do not use body text smaller than 14px for essential content.
- Respect user font scaling and browser zoom.
- Supply useful alternative text for informative images; use empty alt text for purely decorative images.
- Ensure link text is understandable out of context where practical.

## Motion

- Respect prefers-reduced-motion.
- Avoid scroll hijacking, required animated transitions, flashing, and perpetual decoration.
- Provide a usable static state when animation is disabled.

## Forms and status messages

The initial design does not require a contact form. Prefer a direct, verified email link.
If an interactive form is added later, associate visible labels with inputs, describe validation errors in text, preserve entered values after errors, and announce dynamic feedback politely.

## Verification checklist

- Keyboard-only pass through all links and controls.
- Contrast check for every final token pairing and interactive state.
- Reflow at 320 CSS pixels and browser zoom at 200%.
- Screen-reader spot check for headings, landmarks, navigation state, image alternatives, and link names.
- Automated accessibility scan as a supplement, not a replacement for manual testing.
