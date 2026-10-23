import { profile } from "../data/profile";

// Name across the middle; the supporting sentence and action sit in the top-left corner,
// the links in the bottom row. The name settles slightly as the first screen leaves.
export function Hero() {
  return (
    <section id="top" className="flex min-h-[92svh] flex-col justify-between px-[18px] pt-6 pb-[24px] md:px-[24px]">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-[36ch]">
          <p className="text-lg">{profile.positioning}</p>
          <a
            href="#projects"
            className="mt-4 inline-flex min-h-11 items-center bg-foreground px-5 py-3 text-[15px] font-medium text-surface transition-colors duration-200 hover:bg-accent"
          >
            Explore work
          </a>
        </div>
      </div>

      <h1 className="hero-name reveal my-auto text-[clamp(3rem,12.4vw,11rem)] leading-[0.9] font-bold tracking-[-0.02em] whitespace-nowrap">
        {profile.name}
      </h1>

      <div className="flex flex-wrap items-end justify-between gap-6 text-[15px]">
        <p>Lilongwe, Malawi</p>
        <ul className="flex flex-wrap gap-6">
          <li>
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-4 decoration-1 hover:text-accent">
              GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-4 decoration-1 hover:text-accent">
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
