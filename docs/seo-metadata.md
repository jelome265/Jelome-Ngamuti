# SEO and Sharing Metadata

## Page metadata

Proposed title:
**Jelome Ngamuti — Software Developer**

Proposed description:
**Computer Science student and software developer interested in systems, web development, and building reliable software.**

Edit this copy if it does not accurately describe the published portfolio. Keep titles unique if dedicated project pages are added. Avoid keyword stuffing and unverified claims.

## Canonical URL

Current candidate: https://jelomengamuti.pages.dev/

Confirm the production domain and redirect behavior before release. Emit a single absolute canonical URL for the preferred page URL. Do not publish preview deployment URLs as canonical.

## Open Graph and social previews

Set:
- og:type: website
- og:title: same meaning as the page title
- og:description: concise description consistent with visible content
- og:url: canonical URL
- og:image: absolute URL to the approved sharing image
- og:image:alt: descriptive text for the image
- twitter:card: summary_large_image
- twitter:title and twitter:description: aligned with the page metadata
- twitter:image: same approved image unless a separate asset is required

Create an original, high-contrast sharing image at 1200 × 630 pixels. Ensure the title remains readable at small sizes, compress the asset, and test real previews after deployment.

## Technical metadata

- Set the document language to English.
- Set UTF-8 and a responsive viewport.
- Use one descriptive page title and one clear H1.
- Use semantic HTML for content and links.
- Provide a favicon and suitable theme color.
- Add robots.txt only with intentional crawl rules; do not block the production site accidentally.
- Create an XML sitemap if the deployed site and route count justify it. Keep it aligned with canonical URLs.

## Structured data

Use JSON-LD only for facts visible on the page. A minimal Person entity can include:
- @context: https://schema.org
- @type: Person
- name: Jelome Ngamuti
- url: verified canonical URL
- sameAs: verified public profiles, initially GitHub at https://github.com/jelome265

Add jobTitle, image, email, alumniOf, or other properties only when accurate and publicly intended. Do not add ratings, reviews, employment history, affiliations, or structured data for content that does not exist. A WebSite entity is optional for this small portfolio.

## Release checks

- Verify the title, description, canonical URL, favicon, and social metadata in the rendered HTML.
- Ensure social image URLs are absolute, public, and return successfully.
- Validate JSON-LD syntax and test structured data.
- Check for accidental noindex directives and broken links.
- Review the production URL, not only the development server.
