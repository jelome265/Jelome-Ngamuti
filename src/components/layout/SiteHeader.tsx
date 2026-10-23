import { useEffect, useId, useRef, useState } from "react";
import { profile } from "../../data/profile";
import { navigationItems } from "./navigation";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4 md:px-12">
        <a href="#top" className="font-display text-lg font-semibold text-foreground">
          {profile.name}
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex gap-6 text-sm text-muted">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-foreground">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="border border-foreground px-3 py-1.5 text-sm md:hidden"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => {
            setOpen((value) => !value);
          }}
        >
          {open ? "Close menu" : "Menu"}
        </button>
      </div>

      {open && (
        <nav
          id={panelId}
          aria-label="Mobile"
          className="border-t border-border bg-surface md:hidden"
        >
          <ul className="mx-auto max-w-[1200px] px-5">
            {navigationItems.map((item) => (
              <li key={item.href} className="border-b border-border last:border-b-0">
                <a
                  href={item.href}
                  className="flex min-h-11 items-center text-lg text-foreground"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
