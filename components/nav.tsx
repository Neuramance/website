import { Button } from '@/components/ui/button';
import Link from 'next/link';
import HomeNavMenu from './home-nav-menu';
import GlitchWordmark from './ui/glitch-wordmark';

export default function HomepageNav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex w-full justify-center border-b bg-secondary px-8 py-2">
      <div className="flex w-full max-w-[1400px] items-center justify-between">
        <Link href="/">
          <GlitchWordmark />
        </Link>

        <HomeNavMenu />

        <div className="flex gap-2">
          <Link href="/login">
            <Button size="nav" variant="secondary">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="nav" variant="white">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
