import { aboutContent } from "../data/about";

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-8 border-t border-border">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-16 md:grid-cols-12 md:gap-12 md:px-12 md:py-24">
        <div className="md:col-span-4">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">04 · About</p>
          <h2 id="about-heading" className="mt-3 font-display text-[clamp(1.8rem,4vw,2.75rem)] font-semibold">
            About
          </h2>
        </div>
        <div className="max-w-[720px] space-y-6 md:col-span-8">
          <p>{aboutContent.intro}</p>
          <p className="text-muted">{aboutContent.currentStudy}</p>

          <div>
            <h3 className="font-display text-lg font-semibold">Working principles</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
              {aboutContent.principles.map((principle) => (
                <li key={principle}>{principle}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold">Areas I care about</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
              {aboutContent.areas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
