import type { Metadata } from 'next';
import { ContactSection } from '@/components/sections/ContactSection';

export const metadata: Metadata = {
  title: 'Contact — Jelome Ngamuti',
  description:
    'Get in touch with Jelome Ngamuti for collaboration, project inquiries, or opportunities.',
  openGraph: {
    title: 'Contact — Jelome Ngamuti',
    description:
      'Get in touch with Jelome Ngamuti for collaboration, project inquiries, or opportunities.',
  },
};

export default function ContactPage() {
  return <ContactSection />;
}
