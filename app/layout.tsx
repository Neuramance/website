import '@/app/ui/global.css';
import { Metadata } from 'next';
import localFont from 'next/font/local';

import { cn } from './lib/utils';

export const metadata: Metadata = {
  title: {
    template: '%s | Neuramance',
    default: 'Neuramance',
  },
  description: 'The Ultimate AI App.',
  metadataBase: new URL('https://neuramance.com'),
};

const fontSans = localFont({
  src: './fonts/InterVariable.woff2',
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
        )}
      >
        {children}
      </body>
    </html>
  );
}
