import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { Hero } from "../sections/Hero";
import { SelectedProjects } from "../sections/SelectedProjects";
import { TechnicalFocus } from "../sections/TechnicalFocus";
import { Contact } from "../sections/Contact";

export default function App() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-surface focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <SelectedProjects />
        <TechnicalFocus />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
