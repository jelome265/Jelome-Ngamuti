import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Education } from '@/components/sections/Education';
import { Certifications } from '@/components/sections/Certifications';
import { Achievements } from '@/components/sections/Achievements';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { GitHubStats } from '@/components/sections/GitHubStats';
import { TechStack } from '@/components/sections/TechStack';
import { Testimonials } from '@/components/sections/Testimonials';
import { ResumeSection } from '@/components/sections/ResumeSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Certifications />
      <Achievements />
      <FeaturedProjects />
      <GitHubStats />
      <TechStack />
      <Testimonials />
      <ResumeSection />
      <ContactSection />
    </>
  );
}
