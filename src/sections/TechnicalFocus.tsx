import { focusGroups } from "../data/focus";

// Set as a definition list at one size; rows separated by tone steps, not rules.
// Column names are for screen readers only; the layout reads without them.
export function TechnicalFocus() {
  return (
    <section id="focus" aria-labelledby="focus-heading" className="scroll-mt-6 px-[24px] py-[120px]">
      <h2 id="focus-heading" className="reveal text-[40px] leading-[1.1] font-bold tracking-[-0.02em]">
        Technical focus
      </h2>

      <dl className="mt-[72px]">
        <div className="sr-only">
          <dt>Area</dt>
          <dd>Technologies</dd>
          <dd>Used in</dd>
        </div>
        {focusGroups.map((group, index) => (
          <div
            key={group.area}
            className={`reveal grid gap-2 px-4 py-6 text-[24px] leading-[1.3] md:grid-cols-[1fr_1.4fr_1fr] md:gap-8 ${
              index % 2 === 0 ? "bg-surface" : "bg-transparent"
            }`}
          >
            <dt className="font-medium">{group.area}</dt>
            <dd>{group.technologies.join(", ")}</dd>
            <dd className="text-muted">{group.projects.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
