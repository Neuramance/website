import AuthNav from '@/components/auth-nav';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Lazy load GoogleOAuthButton to reduce initial bundle size
const GoogleOAuthButton = dynamic(() => import('@/components/auth').then(mod => ({ default: mod.GoogleOAuthButton })), {
  loading: () => <div className="h-12 w-full rounded-lg bg-gray-200 animate-pulse" />,
  ssr: false
});

export default async function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <AuthNav />
      <div className="flex w-full max-w-sm flex-col justify-start gap-3 p-8">
        <h1 className="mb-4 text-center text-2xl font-semibold">
          Log in to Neuramance
        </h1>

        <GoogleOAuthButton />
        <Link href="/login/email">
          <button className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-border bg-secondary px-5 py-3.5 text-center text-base font-medium text-white hover:bg-neutral-800">
            <EnvelopeClosedIcon />
            Continue with Email
          </button>
        </Link>
      </div>
    </div>
  );
}
