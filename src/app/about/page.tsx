import type { Metadata } from 'next';
import { About } from '@/components/sections/About';

export const metadata: Metadata = {
  title: 'About — Jelome Ngamuti',
  description:
    'Learn more about Jelome Ngamuti — his background, interests, career goals, and what drives him as a software engineer.',
  openGraph: {
    title: 'About — Jelome Ngamuti',
    description:
      'Learn more about Jelome Ngamuti — his background, interests, career goals, and what drives him as a software engineer.',
  },
  robots: { index: true, follow: true },
};

export default function AboutPage() {
  return <About />;
}
