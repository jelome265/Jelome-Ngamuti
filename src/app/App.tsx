import { useReveal } from "../components/ui/useReveal";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { Hero } from "../sections/Hero";
import { SelectedProjects } from "../sections/SelectedProjects";
import { TechnicalFocus } from "../sections/TechnicalFocus";
import { About } from "../sections/About";
import { Contact } from "../sections/Contact";

export default function App() {
  useReveal();

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-surface focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <SelectedProjects />
        <TechnicalFocus />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
