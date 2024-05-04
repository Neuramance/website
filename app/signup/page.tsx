import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import GoogleAuthButton from '@/components/ui/auth';
import { Icons } from '@/components/ui/icons';

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <header className="fixed left-0 right-0 top-0 z-50 flex w-full justify-between px-6 pt-6">
        <Link href="/">
          <Icons.logo className="h-8 w-8" />
        </Link>
      </header>

      <div className="flex max-w-xs flex-col gap-3">
        <h1 className="mb-8 text-center text-3xl font-semibold">
          Create your Neuramance account
        </h1>

        <GoogleAuthButton />
        <Link href="/signup/email">
          <button className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-border bg-secondary px-5 py-3.5 text-center text-base font-medium text-white hover:bg-neutral-800">
            <EnvelopeClosedIcon />
            Continue with Email
          </button>
        </Link>
      </div>
    </main>
  );
}
