import { PageIntro } from "../components/ui/PageIntro";
import { aboutContent } from "../data/about";
import { profile } from "../data/profile";
import { focusGroups } from "../data/focus";

const highlights = ["Malawi", "Computer Science", "backend engineering", "reliable software", "African businesses"];

function withHighlights(text: string) {
  const pattern = new RegExp(`(${highlights.join("|")})`, "g");
  return text.split(pattern).map((part, index) =>
    highlights.includes(part) ? (
      <mark key={index} className="bg-border text-foreground">
        {part}
      </mark>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}

export function AboutPage() {
  return (
    <>
      <section aria-labelledby="about-heading" className="mx-auto max-w-[1280px] px-[32px] pt-[120px] pb-[120px] max-md:px-[18px] max-md:pt-16">
        <PageIntro id="about-heading" title="About">
          {profile.positioning}
        </PageIntro>

        <div className="mt-[96px] columns-2 gap-x-12 text-[24px] leading-[1.35] max-md:columns-1 max-md:text-[18px] max-md:leading-[1.4]">
          <p className="reveal mb-8 break-inside-avoid">{withHighlights(aboutContent.intro)}</p>
          <p className="reveal mb-8 break-inside-avoid text-muted">{withHighlights(aboutContent.currentStudy)}</p>
          {aboutContent.principles.map((principle) => (
            <p key={principle} className="reveal mb-8 break-inside-avoid">{withHighlights(principle)}</p>
          ))}
          <p className="reveal mb-8 break-inside-avoid">Areas I care about: {aboutContent.areas.join("; ")}.</p>
        </div>
      </section>

      <section aria-labelledby="focus-heading" className="mx-auto max-w-[1280px] px-[32px] pb-[120px] max-md:px-[18px]">
        <h2 id="focus-heading" className="reveal text-[40px] leading-[1.1] font-bold tracking-[-0.02em]">
          Technical focus
        </h2>
        <dl className="mt-12">
          <div className="sr-only">
            <dt>Area</dt>
            <dd>Technologies</dd>
            <dd>Used in</dd>
          </div>
          {focusGroups.map((group, index) => (
            <div
              key={group.area}
              className={`reveal grid grid-cols-[1fr_1.4fr_1fr] gap-8 px-6 py-6 text-[24px] leading-[1.3] max-md:grid-cols-1 max-md:gap-2 max-md:px-4 ${
                index % 2 === 0 ? "bg-surface" : "bg-transparent"
              }`}
            >
              <dt className="font-medium">{group.area}</dt>
              <dd>{group.technologies.join(", ")}</dd>
              <dd className="text-muted">{group.projects.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
