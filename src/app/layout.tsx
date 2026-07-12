import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { PageTransition } from '@/components/animation/PageTransition';
import { CustomCursor } from '@/components/animation/CustomCursor';
import { personStructuredData } from '@/lib/utils/seo';
// Providers
import { DeviceTierProvider } from '@/lib/providers/DeviceTierProvider';

export const metadata: Metadata = {
  title: 'Jelome Ngamuti — Software Engineer & Full-Stack Developer',
  description: 'I build secure, scalable, and user-focused software solutions.',
  openGraph: {
    title: 'Jelome Ngamuti — Software Engineer & Full-Stack Developer',
    description: 'I build secure, scalable, and user-focused software solutions.',
    url: 'https://jelomengamuti.dev',
    siteName: 'Jelome Ngamuti',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = personStructuredData();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body>
        <DeviceTierProvider>
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <CustomCursor />
        </DeviceTierProvider>
      </body>
    </html>
  );
}
