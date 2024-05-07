import UserStatus from '@/components/dev/user-status';
import { cn } from '@/lib/utils';
import '@/styles/global.css';
import { GeistMono } from 'geist/font/mono';
import { Metadata } from 'next';
import localFont from 'next/font/local';

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
  src: '../lib/fonts/InterVariable.woff2',
  display: 'swap',
  variable: '--font-sans',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen font-sans antialiased',
          fontSans.variable,
          GeistMono.variable,
        )}
      >
        {children}
        {process.env.DEV_TOOLS === '1' && <UserStatus />}
      </body>
    </html>
  );
}
