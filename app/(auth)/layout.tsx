import '@/styles/global.css';
import { GeistMono } from 'geist/font/mono';
import { Metadata } from 'next';
import localFont from 'next/font/local';

import AuthNav from '@/components/auth-nav';
import UserStatus from '@/components/dev/user-status';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: {
    template: '%s | Neuramance',
    default: 'Neuramance',
  },
  description: 'Your Command Center For Everyday AI.',
  metadataBase: new URL('https://Neuramance.com'),
  openGraph: {
    images: '/opengraph-image.jpg',
  },
};

const fontSans = localFont({
  src: '../../lib/fonts/InterVariable.woff2',
  display: 'swap',
  variable: '--font-sans',
});

const showDevTools = process.env.DEV_TOOLS === '1';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen font-sans antialiased',
          fontSans.variable,
          GeistMono.variable,
        )}
      >
        <AuthNav />
        {children}
        {showDevTools && <UserStatus />}
      </body>
    </html>
  );
}
