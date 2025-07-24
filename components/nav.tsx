import Link from 'next/link';
import AccountBlock from './account-block';
import HomeNavMenu from './home-nav-menu';
import GlitchWordmark from './ui/glitch-wordmark';
import { Button } from './ui/button';
import { LogIn, Send } from 'lucide-react';
import { HandIcon } from '@radix-ui/react-icons';



export default function HomepageNav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex w-full justify-center border-b bg-secondary px-2 py-1">
      <div className="flex w-full items-center justify-between">
        <Link href="/contact">
            <Button size="nav" variant="secondary" className="gap-1">
              <Send className="h-[8px] w-[10px]" />
              Contact
            </Button>
          </Link>

        <div className="absolute left-1/2 -translate-x-1/2 transform">
          <Link href="/deepstrategy">
            <Button size="nav" variant="secondary" className="gap-1">
              <HandIcon className="h-[8px] w-[10px]" />
              DeepStrategy<sup className="ml-[-3px] text-[8px] leading-none align-[0.1em]">1</sup>
            </Button>
          </Link>
        </div>

        <AccountBlock />
      </div>
    </header>
  );
}
