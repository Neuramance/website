import Link from 'next/link';
import AccountBlock from './account-block';
import HomeNavMenu from './home-nav-menu';
import GlitchWordmark from './ui/glitch-wordmark';

export default function HomepageNav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex w-full justify-center border-b bg-secondary px-5 py-1">
      <div className="flex w-full items-center justify-between">
        <Link href="/">
          <GlitchWordmark />
        </Link>

        <HomeNavMenu />

        <AccountBlock />
      </div>
    </header>
  );
}
