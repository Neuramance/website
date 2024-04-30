import { Hero } from '@/app/ui/home/hero';
import HomepageHeader from '@/app/ui/home/nav';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <HomepageHeader />
      <Hero />
    </main>
  );
}
