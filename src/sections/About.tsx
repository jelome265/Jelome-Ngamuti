import { aboutContent } from "../data/about";

// Body text in two columns; the facts a scanning reader wants are highlighted with a tone step.
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

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-6 px-[24px] py-[120px]">
      <h2 id="about-heading" className="reveal text-[40px] leading-[1.1] font-bold tracking-[-0.02em]">
        About
      </h2>
      <div className="mt-[72px] columns-1 gap-x-10 text-[18px] leading-[1.4] md:columns-2 md:text-[24px] md:leading-[1.35]">
        <p className="reveal mb-6 break-inside-avoid">{withHighlights(aboutContent.intro)}</p>
        <p className="reveal mb-6 break-inside-avoid text-muted">{withHighlights(aboutContent.currentStudy)}</p>
        {aboutContent.principles.map((principle) => (
          <p key={principle} className="reveal mb-6 break-inside-avoid">{withHighlights(principle)}</p>
        ))}
        <p className="reveal mb-6 break-inside-avoid">
          Areas I care about: {aboutContent.areas.join("; ")}.
        </p>
      </div>
    </section>
  );
}
