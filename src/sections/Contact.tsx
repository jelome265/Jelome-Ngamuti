import { profile } from "../data/profile";

const linkClass =
  "text-dark-accent underline-offset-4 hover:underline";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-8 bg-dark-surface text-dark-text"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-12 md:py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-dark-accent">05 · Contact</p>
        <h2 id="contact-heading" className="mt-3 font-display text-[clamp(1.8rem,4vw,2.75rem)] font-semibold">
          Contact
        </h2>
        <ul className="mt-8 flex flex-wrap gap-6">
          <li>
            <a href={`mailto:${profile.email}`} className={linkClass}>
              {profile.email}
            </a>
          </li>
          <li>
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
              GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
