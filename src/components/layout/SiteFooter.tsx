import { Link } from "react-router";
import { copyrightYear, profile } from "../../data/profile";

// Full-bleed contact area. The email is the visual anchor without making the footer a mostly empty screen.
export function SiteFooter() {
  return (
    <footer id="contact" className="on-dark bg-dark-surface text-dark-text">
      <div className="mx-auto flex min-h-[58svh] max-w-[1280px] flex-col justify-between px-[32px] py-10 max-md:min-h-[55svh] max-md:px-[18px]">
        <div className="reveal flex flex-wrap items-start justify-between gap-6 text-[15px]">
          <p>
            © {copyrightYear} {profile.name}
          </p>
          <p>Lilongwe, Malawi</p>
          <ul className="flex gap-8">
            <li>
              <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-dark-accent">
                LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-dark-accent">
                GitHub<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <Link to="/" className="inline-flex min-h-11 items-center hover:text-dark-accent">
                Home
              </Link>
            </li>
          </ul>
        </div>

        <a
          href={`mailto:${profile.email}`}
          className="reveal mt-24 block text-[clamp(3rem,11.2vw,10rem)] leading-[0.9] font-bold tracking-[-0.03em] break-all decoration-2 underline-offset-[0.08em] hover:underline"
        >
          {profile.email}
        </a>
      </div>
    </footer>
  );
}
