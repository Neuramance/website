import UserStatus from '@/components/dev/user-status';
import { ErrorBoundary } from '@/components/error-boundary';
import { AudioProvider } from '@/lib/contexts/AudioContext';
import { cn } from '@/lib/utils';
import '@/styles/global.css';
import { Metadata } from 'next';
import localFont from 'next/font/local';

export const metadata: Metadata = {
  title: {
    template: '%s | Neuramance®',
    default: 'Neuramance® - Your Command Center For Everyday AI',
  },
  description: 'Neuramance is your command center for everyday AI. Experience turbocognition, hyperanalysis, and superenjoyment of multimedia, literature, and markets.',
  keywords: ['AI', 'artificial intelligence', 'command center', 'turbocognition', 'hyperanalysis', 'multimedia', 'automation'],
  authors: [{ name: 'Neuramance' }],
  creator: 'Neuramance',
  publisher: 'Neuramance',
  metadataBase: new URL('https://neuramance.com'),
  alternates: {
    canonical: 'https://neuramance.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://neuramance.com',
    siteName: 'Neuramance',
    title: 'Neuramance® - Your Command Center For Everyday AI',
    description: 'Experience turbocognition, hyperanalysis, and superenjoyment of multimedia, literature, and markets.',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Neuramance - Your Command Center For Everyday AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neuramance® - Your Command Center For Everyday AI',
    description: 'Experience turbocognition, hyperanalysis, and superenjoyment of multimedia, literature, and markets.',
    images: ['/opengraph-image.jpg'],
  },
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
};

const fontSans = localFont({
  src: '../lib/fonts/InterVariable.woff2',
  display: 'swap',
  variable: '--font-sans',
  preload: true,
});

const fontMono = localFont({
  src: '../lib/fonts/InterVariable.woff2', // Use Inter for mono too to reduce bundle
  display: 'swap', 
  variable: '--font-mono',
  preload: true,
});

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Neuramance",
  "url": "https://neuramance.com",
  "logo": "https://neuramance.com/opengraph-image.jpg",
  "description": "Your command center for everyday AI. Experience turbocognition, hyperanalysis, and superenjoyment of multimedia, literature, and markets.",
  "foundingDate": "2024",
  "sameAs": [
    "https://twitter.com/neuramance",
    "https://github.com/neuramance"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "url": "https://neuramance.com/contact"
  },
  "offers": {
    "@type": "Offer",
    "name": "AI Command Center Access",
    "description": "Access to Neuramance AI platform for turbocognition and hyperanalysis",
    "category": "Software"
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/lib/fonts/InterVariable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={cn(
          'min-h-screen font-sans antialiased',
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <ErrorBoundary>
          <AudioProvider>
            <ErrorBoundary
              fallback={
                <div className="flex min-h-[100px] items-center justify-center p-4">
                  <p className="text-sm text-gray-600">Audio system temporarily unavailable</p>
                </div>
              }
            >
              {children}
            </ErrorBoundary>
            {process.env.DEV_TOOLS === '1' && <UserStatus />}
          </AudioProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
