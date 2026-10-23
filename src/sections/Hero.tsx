import { profile } from "../data/profile";

const stages = ["Design", "Build", "Verify"] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto grid max-w-[1200px] scroll-mt-8 gap-12 px-5 py-16 md:grid-cols-12 md:gap-12 md:px-12 md:py-24"
    >
      <div className="md:col-span-7 md:self-center">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">{profile.eyebrow}</p>
        <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.1] font-semibold">
          {profile.name}
        </h1>
        <p className="mt-4 max-w-[720px] text-lg">{profile.positioning}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="bg-accent px-5 py-3 text-sm font-medium text-surface transition-colors duration-200 hover:bg-accent-hover"
          >
            Explore selected work
          </a>
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-accent px-5 py-3 text-sm font-medium text-accent transition-colors duration-200 hover:border-accent-hover hover:text-accent-hover"
          >
            GitHub profile<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>

      <aside aria-hidden="true" className="border border-border bg-surface p-6 md:col-span-5">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">Design / Build / Verify</p>
        <ol className="mt-4 border-l border-accent">
          {stages.map((stage, index) => (
            <li key={stage} className="relative py-3 pl-5">
              <span className="absolute -left-[5px] top-[18px] size-[9px] bg-accent" />
              <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>{" "}
              <span className="font-display text-lg">{stage}</span>
            </li>
          ))}
        </ol>
      </aside>
    </section>
  );
}
