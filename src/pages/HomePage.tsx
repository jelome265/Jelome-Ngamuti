import { PortfolioEvidence } from "../components/ui/PortfolioEvidence";
import { Hero } from "../sections/Hero";

export function HomePage() {
  return (
    <>
      <Hero />
      <PortfolioEvidence variant="home" />
    </>
  );
}
