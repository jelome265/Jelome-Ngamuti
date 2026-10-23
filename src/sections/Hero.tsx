import { profile } from "../data/profile";

const stages = ["Design", "Build", "Verify"] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto max-w-[1200px] scroll-mt-8 px-5 py-16 md:px-12 md:py-28"
    >
      <p className="font-mono text-xs uppercase tracking-widest text-muted">{profile.eyebrow}</p>
      <h1 className="mt-4 font-display text-[clamp(3rem,9vw,7rem)] leading-[1] font-semibold">
        {profile.name}
      </h1>
      <p className="mt-6 max-w-[720px] text-xl">{profile.positioning}</p>
      <div className="mt-10 flex flex-wrap gap-3">
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

      <ol aria-hidden="true" className="mt-16 grid max-w-[720px] grid-cols-3 border-t border-border pt-4 font-mono text-xs uppercase tracking-widest text-muted">
        {stages.map((stage, index) => (
          <li key={stage}>
            <span className="text-muted">{String(index + 1).padStart(2, "0")}</span> {stage}
          </li>
        ))}
      </ol>
    </section>
  );
}
