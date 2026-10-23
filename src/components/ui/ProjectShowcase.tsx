import { useState } from "react";
import type { ProjectShowcase as ProjectShowcaseContent } from "../../types/portfolio";

interface ProjectShowcaseProps {
  readonly content: ProjectShowcaseContent;
}

export function ProjectShowcase({ content }: ProjectShowcaseProps) {
  const [copyStatus, setCopyStatus] = useState("");

  async function copyCommand() {
    if (!navigator.clipboard?.writeText) {
      setCopyStatus("Clipboard access is unavailable. Select the command and copy it manually.");
      return;
    }

    try {
      await navigator.clipboard.writeText(content.command);
      setCopyStatus("Command copied.");
    } catch {
      setCopyStatus("Copy failed. Select the command and copy it manually.");
    }
  }

  return (
    <figure className="reveal m-0 min-w-0">
      <div data-ui className="bg-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <h4 className="text-[26px] leading-[1.15] font-semibold tracking-[-0.02em]">
              {content.title}
            </h4>
            <p className="mt-3 text-[16px] leading-[1.5] text-muted">{content.description}</p>
          </div>
          <button
            type="button"
            onClick={copyCommand}
            className="inline-flex min-h-11 shrink-0 items-center bg-foreground px-4 text-[15px] font-medium text-surface hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Copy command
          </button>
        </div>

        <pre className="mt-6 overflow-x-auto bg-background p-4 text-[14px] leading-[1.65] whitespace-pre-wrap break-words"><code>{content.command}</code></pre>
        <p className="mt-4 text-[16px] leading-[1.5]">{content.detail}</p>
        <p role="status" aria-live="polite" className="mt-3 min-h-6 text-[14px] leading-[1.5] text-muted">
          {copyStatus}
        </p>
      </div>
      <figcaption className="mt-3 text-[15px] leading-[1.45] text-muted">
        Installation command documented in the{" "}
        <a
          href="https://github.com/jelome265/Rustacean#install-on-each-platform"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-accent"
        >
          Rustacean README
        </a>
        .
      </figcaption>
    </figure>
  );
}
