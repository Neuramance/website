import { Hero } from '@/app/ui/home/hero';
import HomepageHeader from '@/app/ui/home/nav';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[url('/stars-bg.png')] bg-[length:1090px] bg-center"></div>
      <HomepageHeader />
      <Hero />
    </main>
  );
}
