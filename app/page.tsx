import { Hero } from '@/components/hero';
import HomepageNav from '@/components/nav';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <HomepageNav />
      <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[url('/stars-bg.png')] bg-[length:1090px] bg-center" />
      <Hero />
    </main>
  );
}
