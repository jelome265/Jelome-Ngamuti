import { useEffect } from "react";

// Adds .is-visible once each .reveal element enters the viewport.
// Content stays visible when JavaScript is off, and when reduced motion is requested.
export function useReveal(): void {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    root.classList.add("motion-ready");

    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    elements.forEach((element) => {
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      root.classList.remove("motion-ready");
    };
  }, []);
}
