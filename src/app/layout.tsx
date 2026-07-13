import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { PageTransition } from '@/components/animation/PageTransition';
import { CustomCursor } from '@/components/animation/CustomCursor';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { BackToTop } from '@/components/layout/BackToTop';
import { SectionRail } from '@/components/layout/SectionRail';
import { personStructuredData } from '@/lib/utils/seo';
import { ThemeProvider } from '@/lib/providers/ThemeProvider';
import { DeviceTierProvider } from '@/lib/providers/DeviceTierProvider';
import { LenisProvider } from '@/lib/providers/LenisProvider';
import { AnalyticsProvider } from '@/lib/providers/AnalyticsProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], display: 'swap', variable: '--font-mono' });

export const metadata: Metadata = {
  metadataBase: new URL('https://jelomengamuti.dev'),
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
  robots: { index: true, follow: true },
};

const jsonLd = personStructuredData();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-sans antialiased bg-bg text-text-primary">
        <ThemeProvider>
          <DeviceTierProvider>
            <LenisProvider>
              <AnalyticsProvider>
                <ScrollProgress />
                <Navbar />
                <PageTransition>
                  <main className="min-h-screen">{children}</main>
                </PageTransition>
                <Footer />
                <BackToTop />
                <SectionRail />
                <CustomCursor />
              </AnalyticsProvider>
            </LenisProvider>
          </DeviceTierProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
