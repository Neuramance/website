'use client';

import useUser from '@/lib/auth/user';
import Link from 'next/link';
import AccountBlock from './account-block';
import HomeNavMenu from './home-nav-menu';
import GlitchWordmark from './ui/glitch-wordmark';

export default function HomepageNav() {
  const user = useUser();
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex w-full justify-center border-b bg-secondary px-8 py-2">
      <div className="flex w-full max-w-[1400px] items-center justify-between">
        <Link href="/">
          <GlitchWordmark />
        </Link>

        <HomeNavMenu />

        <AccountBlock user={user} />
      </div>
    </header>
  );
}
