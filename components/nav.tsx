import Link from 'next/link';
import Image from 'next/image';
import AccountBlock from './account-block';
import HomeNavMenu from './home-nav-menu';
import MobileNavMenu from './mobile-nav-menu';
import GlitchWordmark from './ui/glitch-wordmark';
import { Button } from './ui/button';
import { LogIn, Circle, Terminal } from 'lucide-react';
import { DashboardIcon, TokensIcon, ReaderIcon, TransformIcon } from '@radix-ui/react-icons';



export default function HomepageNav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex w-full justify-center border-b bg-secondary px-2 py-1">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-1">
          <Link href="/">
            <Button size="nav" variant="secondary" className="gap-1 font-mono">
              <Image src="/hand.svg" alt="Hand icon" width={10} height={8} className="h-[8px] w-[10px]" />
              Neuramance
            </Button>
          </Link>
          <Link href="/about">
            <Button size="nav" variant="secondary" className="gap-1 font-mono">
              <Terminal className="h-[8px] w-[10px]" />
              About/Contact
            </Button>
          </Link>
          <MobileNavMenu />
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 transform hidden lg:flex gap-1">
          <Link href="/deepstrategy">
            <Button size="nav" variant="secondary" className="gap-1 font-mono">
              <DashboardIcon className="h-[8px] w-[10px]" />
              DeepStrategy<sup className="ml-[-3px] text-[8px] leading-none relative top-[-2px]">1</sup>
            </Button>
          </Link>
          <Link href="/hypercognition">
            <Button size="nav" variant="secondary" className="gap-1 font-mono">
              <TokensIcon className="h-[8px] w-[10px]" />
              HyperCognition<sup className="ml-[-3px] text-[8px] leading-none relative top-[-2px]">2</sup>
            </Button>
          </Link>
          <Link href="/cyberlingua">
            <Button size="nav" variant="secondary" className="gap-1 font-mono">
              <TransformIcon className="h-[8px] w-[10px]" />
              CyberLingua<sup className="ml-[-3px] text-[8px] leading-none relative top-[-2px]">3</sup>
            </Button>
          </Link>
        </div>

        <AccountBlock />
      </div>
    </header>
  );
}
