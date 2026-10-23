import { Link } from "react-router";
import { profile } from "../data/profile";
import { WorkStatement } from "../components/ui/WorkStatement";

// The name runs across the middle. The supporting line and actions sit in the top-left,
// the location in the bottom-left. The name settles slightly as the first screen leaves.
export function Hero() {
  return (
    <section className="mx-auto flex min-h-[88svh] max-w-[1280px] flex-col justify-between px-[32px] pt-10 pb-8 max-md:min-h-[72svh] max-md:px-[18px]">
      <div className="reveal max-w-[36ch]">
        <p className="text-[18px]">{profile.positioning}</p>
        <div className="reveal mt-6 flex flex-wrap gap-3">
          <Link to="/projects" className="inline-flex min-h-11 items-center bg-foreground px-5 text-[15px] font-medium text-surface transition-colors duration-200 hover:bg-accent">
            View projects
          </Link>
          <Link to="/about" className="inline-flex min-h-11 items-center border border-foreground px-5 text-[15px] font-medium transition-colors duration-200 hover:bg-foreground hover:text-surface">
            About
          </Link>
        </div>
      </div>

      <h1 className="hero-name reveal my-auto text-[clamp(3rem,11.2vw,10rem)] leading-[0.9] font-bold tracking-[-0.02em] whitespace-nowrap">
        {profile.name}
      </h1>
      <WorkStatement />
    </section>
  );
}
