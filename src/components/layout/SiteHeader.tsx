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
    <header className="bg-background">
      <div className="flex items-center justify-between px-[18px] py-4 md:px-[24px]">
        <a href="#top" className="text-lg font-medium text-foreground">
          {profile.name}
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex gap-7 text-[15px]">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 items-center underline underline-offset-4 decoration-1 hover:text-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="min-h-11 min-w-11 bg-foreground px-4 text-[15px] text-surface md:hidden"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => {
            setOpen((value) => !value);
          }}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id={panelId} aria-label="Mobile" className="bg-surface md:hidden">
          <ul className="px-[18px] py-2">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex min-h-11 items-center text-[24px] text-foreground"
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
