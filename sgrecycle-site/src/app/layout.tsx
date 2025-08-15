import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://sgrecycle.com'
  ),
  title: {
    default: 'SG Recycle - Sustainable Recycling Solutions for Singapore',
    template: '%s | SG Recycle',
  },
  description:
    'SG Recycle provides innovative plastic bottle and paper recycling machines for Singapore businesses. Transform waste into valuable resources with our sustainable technology solutions.',
  keywords: [
    'recycling machines Singapore',
    'plastic bottle recycling',
    'paper recycling Singapore',
    'waste management solutions',
    'sustainable technology',
    'circular economy',
    'environmental technology',
    'SG Recycle',
    'Singapore recycling',
    'eco-friendly machines',
  ],
  authors: [{ name: 'SG Recycle', url: 'https://sgrecycle.com' }],
  creator: 'SG Recycle',
  publisher: 'SG Recycle',
  category: 'Technology',
  classification: 'Environmental Technology',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_SG',
    alternateLocale: ['en_US'],
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://sgrecycle.com',
    siteName: 'SG Recycle',
    title: 'SG Recycle - Leading Recycling Technology in Singapore',
    description:
      "Transform your waste management with SG Recycle's innovative plastic bottle and paper recycling machines. Sustainable solutions for Singapore businesses.",
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SG Recycle - Sustainable Recycling Solutions',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sgrecycle',
    creator: '@sgrecycle',
    title: 'SG Recycle - Sustainable Recycling Solutions',
    description:
      "Transform waste into valuable resources with SG Recycle's innovative recycling technology for Singapore.",
    images: {
      url: '/images/og-image.jpg',
      alt: 'SG Recycle - Sustainable Recycling Solutions',
    },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://sgrecycle.com',
    languages: {
      'en-SG': '/en-sg',
      'en-US': '/en-us',
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
  },
  other: {
    'msapplication-TileColor': '#6CBF3F',
    'application-name': 'SG Recycle',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sgrecycle.com';

  return (
    <html lang="en" className={nunito.variable}>
      <head>
        {/* Canonical URL */}
        <link rel="canonical" href={baseUrl} />

        {/* Theme and Browser Configuration */}
        <meta name="theme-color" content="#6CBF3F" />
        <meta name="msapplication-TileColor" content="#6CBF3F" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SG Recycle" />

        {/* Icons and Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Preload Critical Resources */}
        <link
          rel="preload"
          href="/_next/static/css/app/layout.css"
          as="style"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch for External Resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />

        {/* Rich Snippets Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'SG Recycle',
              description:
                'Sustainable recycling solutions for Singapore businesses',
              url: baseUrl,
              logo: `${baseUrl}/images/logo.svg`,
              foundingDate: '2024',
              foundingLocation: {
                '@type': 'Place',
                name: 'Singapore',
              },
              areaServed: {
                '@type': 'Country',
                name: 'Singapore',
              },
              industry: 'Environmental Technology',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+65-6789-1234',
                contactType: 'Customer Service',
                email: 'hello@sgrecycle.com',
                availableLanguage: ['English'],
              },
              sameAs: [
                'https://linkedin.com/company/sgrecycle',
                'https://twitter.com/sgrecycle',
                'https://facebook.com/sgrecycle',
              ],
              address: {
                '@type': 'PostalAddress',
                streetAddress: '123 Innovation Drive',
                addressLocality: 'Singapore Science Park',
                postalCode: '138588',
                addressCountry: 'SG',
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <Header />
        <main className="pt-16 lg:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
