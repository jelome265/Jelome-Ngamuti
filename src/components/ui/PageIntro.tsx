import type { ReactNode } from "react";
import { profile } from "../../data/profile";

interface PageIntroProps {
  readonly id: string;
  readonly title: string;
  readonly children: ReactNode;
}

// Page title on the left, a plain statement and one real action on the right, so the first screen says what it is.
export function PageIntro({ id, title, children }: PageIntroProps) {
  return (
    <div className="grid grid-cols-12 items-end gap-x-6 gap-y-10 max-md:grid-cols-1">
      <h1
        id={id}
        className="reveal col-span-8 text-[clamp(3rem,11.2vw,10rem)] leading-[0.9] font-bold tracking-[-0.03em] max-md:col-span-full"
      >
        {title}
      </h1>
      <div className="col-span-4 col-start-9 flex flex-col gap-6 text-[18px] max-md:col-span-full max-md:col-start-auto">
        <p className="reveal">{children}</p>
        <div className="reveal">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex min-h-11 items-center bg-foreground px-5 text-[15px] font-medium text-surface transition-colors duration-200 hover:bg-accent"
          >
            Email {profile.name.split(" ")[0]}
          </a>
        </div>
      </div>
    </div>
  );
}
