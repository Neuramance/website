import '@/styles/global.css';
import { GeistMono } from 'geist/font/mono';
import { Metadata } from 'next';
import localFont from 'next/font/local';

// import UserStatus from '@/components/ui/user-status';
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
  src: '../lib/fonts/InterVariable.woff2',
  display: 'swap',
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          GeistMono.variable,
        )}
      >
        {children}
        {/* <UserStatus /> */}
      </body>
    </html>
  );
}
