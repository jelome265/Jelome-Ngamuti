import { profile } from "../data/profile";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-8 bg-dark-surface text-dark-text"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-12 md:py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-dark-accent">03 · Contact</p>
        <h2 id="contact-heading" className="mt-3 font-display text-[clamp(1.8rem,4vw,2.75rem)] font-semibold">
          Contact
        </h2>
        <ul className="mt-8 flex flex-wrap gap-6">
          <li>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-accent underline-offset-4 hover:underline"
            >
              GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
