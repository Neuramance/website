import Link from 'next/link';
import AccountBlock from './account-block';
import HomeNavMenu from './home-nav-menu';
import GlitchWordmark from './ui/glitch-wordmark';
import { Button } from './ui/button';
import { LogIn, Send } from 'lucide-react';



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

        <AccountBlock />
      </div>
    </header>
  );
}
