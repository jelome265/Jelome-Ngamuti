import { profile } from "../data/profile";

// Contact is a plain list of real destinations. No form: there is no backend to receive one.
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-6 px-[24px] pt-[120px] pb-[60px]">
      <h2 id="contact-heading" className="reveal text-[40px] leading-[1.1] font-bold tracking-[-0.02em]">
        Contact
      </h2>
      <ul className="mt-[72px] flex flex-col gap-2 text-[24px]">
        <li>
          <a href={`mailto:${profile.email}`} className="inline-flex min-h-11 items-center underline underline-offset-[0.12em] decoration-2 hover:text-accent">
            {profile.email}
          </a>
        </li>
        <li>
          <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-[0.12em] decoration-2 hover:text-accent">
            LinkedIn<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
        <li>
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-[0.12em] decoration-2 hover:text-accent">
            GitHub<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      </ul>
    </section>
  );
}
