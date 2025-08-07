'use client';

import dynamic from 'next/dynamic';

// Lazy load Hero component to reduce initial bundle size
const Hero = dynamic(() => import('@/components/hero').then(mod => ({ default: mod.Hero })), {
  loading: () => <div className="flex h-screen w-full items-center justify-center">Loading...</div>,
  ssr: true
});

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[length:1090px] bg-center" />
      <Hero />
    </main>
  );
}
