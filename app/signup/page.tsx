import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import AuthNav from '@/components/auth-nav';
import GoogleOAuthButton from '@/components/ui/oauth';

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <AuthNav />

      <div className="flex max-w-xs flex-col gap-3">
        <h1 className="mb-8 text-center text-3xl font-semibold">
          Create your Neuramance account
        </h1>

        <GoogleOAuthButton />
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
