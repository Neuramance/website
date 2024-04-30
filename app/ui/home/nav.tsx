'use client';

import { Button } from '@/app/ui/button';
import Link from 'next/link';
import { useGlitch } from 'react-powerglitch';
import Wordmark from '../wordmark';

export default function HomepageNav() {
  const glitch = useGlitch({
    timing: {
      duration: 8000,
    },
  });
  return (
    <header className="flex items-center justify-between  px-8 pt-4">
      <Link href="/">
        <Wordmark ref={glitch.ref} />
      </Link>
      <Button size="home" variant="secondary">
        Sign in
      </Button>
    </header>
  );
}
