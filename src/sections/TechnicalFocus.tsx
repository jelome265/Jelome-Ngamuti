import { focusGroups } from "../data/focus";

export function TechnicalFocus() {
  return (
    <section id="focus" aria-labelledby="focus-heading" className="scroll-mt-8 border-t border-border">
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-12 md:py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">02 · Technical focus</p>
        <h2 id="focus-heading" className="mt-3 font-display text-[clamp(1.8rem,4vw,2.75rem)] font-semibold">
          Technical focus
        </h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {focusGroups.map((group) => (
            <li key={group.area} className="border-t border-border pt-4">
              <h3 className="font-display text-lg font-semibold">{group.area}</h3>
              <p className="mt-2 text-muted">{group.technologies.join(", ")}</p>
              <p className="mt-2 text-sm text-muted">Used in: {group.projects.join(", ")}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
