import Link from 'next/link';
import { Icons } from './ui/icons';

export default function AuthNav() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex w-full justify-between px-6 pt-6">
      <Link href="/">
        <Icons.logo className="h-8 w-8" />
      </Link>
    </header>
  );
}
