import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { profile } from "../../data/profile";
import { navigationItems, type NavItem } from "./navigation";

// One navigation model for both layouts: plain links, the current page marked by an underline.
function NavEntry({ item, className }: { readonly item: NavItem; readonly className: string }) {
  if (item.external) {
    return (
      <a href={item.to} className={className}>
        {item.label}
      </a>
    );
  }
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) => `${className} ${isActive ? "underline underline-offset-4" : ""}`}
    >
      {item.label}
    </NavLink>
  );
}

export function SiteHeader() {
  const { pathname } = useLocation();
  // The panel is open for one path only, so any route change closes it without an effect.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const setOpen = (value: boolean) => {
    setOpenPath(value ? pathname : null);
  };
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPath(null);
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
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-[32px] py-6 max-md:px-[18px]">
        <Link to="/" className="text-[18px] font-medium">
          {profile.name}
        </Link>

        <nav aria-label="Primary" className="max-md:hidden">
          <ul className="flex gap-8">
            {navigationItems.map((item) => (
              <li key={item.to}>
                <NavEntry item={item} className="inline-flex min-h-11 items-center text-[15px] hover:text-accent" />
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="hidden min-h-11 min-w-11 items-center bg-foreground px-4 text-[15px] text-surface max-md:inline-flex"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => {
            setOpen(!open);
          }}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id={panelId} aria-label="Mobile" className="hidden bg-surface max-md:block">
          <ul className="px-[18px] py-2">
            {navigationItems.map((item) => (
              <li key={item.to}>
                <NavEntry item={item} className="flex min-h-11 items-center text-[24px] text-foreground" />
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
