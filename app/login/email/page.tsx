'use client';

import { loginWithMagicLink } from '@/app/login/actions';
import { Icons } from '@/app/ui/icons/icons';
import { Input } from '@/app/ui/input';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { FormEvent } from 'react'; // Import FormEvent

export default function Page() {
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData(event.currentTarget); // Capture the form data

    await loginWithMagicLink(formData); // Call your function with the form data
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <header className="fixed left-0 right-0 top-0 z-50 flex w-full justify-center px-6 pb-2 pt-6">
        <div className="flex w-full items-center justify-between">
          <Link href="/">
            <Icons.logoIcon className="h-8 w-8" />
          </Link>
        </div>
      </header>

      <div className="w-full max-w-sm space-y-6 rounded-lg p-8">
        <h1 className="mb-10 text-center text-3xl font-semibold">
          Log in to Neuramance
        </h1>

        <form onSubmit={handleFormSubmit} className="flex flex-col space-y-3">
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Email Address"
            className="h-12 rounded-lg px-5 py-3.5 text-base"
            required
          />
          <button
            type="submit"
            className="flex h-12 items-center justify-center gap-3 rounded-lg border border-border bg-[#ededed] px-5 py-3.5 text-center text-base font-medium text-black hover:bg-[#cccccc]"
          >
            <EnvelopeClosedIcon />
            Continue with Email
          </button>
        </form>
      </div>
    </main>
  );
}
