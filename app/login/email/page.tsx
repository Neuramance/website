'use client';

import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { loginWithMagicLink } from '@/lib/auth/actions';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { FormEvent, useState } from 'react'; // Import useState

export default function Page() {
  const [emailSent, setEmailSent] = useState(false); // State to track if email is sent
  const [submittedEmail, setSubmittedEmail] = useState(''); // State to store the submitted email

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email'); // Get email from formData
    if (typeof email === 'string') {
      setSubmittedEmail(email); // Update state with the submitted email
    }

    await loginWithMagicLink(formData);
    setEmailSent(true); // Set emailSent state to true after function call
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <header className="fixed left-0 right-0 top-0 z-50 flex w-full justify-between px-6 pb-2 pt-6">
        <Link href="/">
          <Icons.logo className="h-8 w-8" />
        </Link>
      </header>

      <div className="flex w-full max-w-sm flex-col justify-start gap-3 rounded-lg p-8">
        <h1 className="mb-8 text-center text-3xl font-semibold">
          Log in to Neuramance
        </h1>
        {!emailSent ? (
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
        ) : (
          <div className="text-center text-lg">
            Check your email: {submittedEmail}
          </div>
        )}
      </div>
    </main>
  );
}
