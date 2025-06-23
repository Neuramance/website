import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { Terminal } from 'lucide-react';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden"></div>

      <Alert className="w-[600px] bg-secondary">
        <Terminal className="h-4 w-4" />
        <AlertTitle>You are on the waitlist.</AlertTitle>
        <AlertDescription>
          Thank you very much for your interest in Neuramance.
          <br />
          <br />
          <strong>Neuramance</strong> is currently in private
          beta, as we are still working on building the product.
          <br />
          <br />
          Look out for emails containing updates & news, including beta access.
          <br />
          <br />
          Thank you for your support,
          <br />
          <p className="font-mono">- Austin @ Neuramance</p>
        </AlertDescription>
      </Alert>
    </main>
  );
}
