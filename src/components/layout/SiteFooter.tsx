import { copyrightYear, profile } from "../../data/profile";

// Full-bleed field: the contact line is the headline, set to the width of the page.
export function SiteFooter() {
  return (
    <footer id="footer" className="on-dark bg-dark-surface text-dark-text">
      <div className="flex min-h-[80svh] flex-col justify-between px-[24px] py-10">
        <div className="flex flex-wrap items-start justify-between gap-6 text-[15px]">
          <p>
            © {copyrightYear} {profile.name}
          </p>
          <p>Lilongwe, Malawi</p>
          <a href="#top" className="inline-flex min-h-11 items-center underline underline-offset-4 decoration-1">
            Back to top
          </a>
        </div>

        <a
          href={`mailto:${profile.email}`}
          className="mt-24 block text-[clamp(3rem,12.4vw,11rem)] leading-[0.9] font-bold tracking-[-0.03em] break-all underline-offset-[0.08em] decoration-2 hover:underline"
        >
          {profile.email}
        </a>
      </div>
    </footer>
  );
}
