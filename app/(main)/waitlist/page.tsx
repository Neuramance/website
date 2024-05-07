import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { Terminal } from 'lucide-react';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden bg-dot-pattern bg-[size:20px_20px] bg-[position:0_0,10px_10px]"></div>

      <Alert className="w-[600px] bg-secondary">
        <Terminal className="h-4 w-4" />
        <AlertTitle>You are on the waitlist. 👍</AlertTitle>
        <AlertDescription>
          Thank you very much for your interest in Neuramance, we sincerly
          appreciate it. <br />
          <br />
          <strong>Neuramance Command Center</strong> is currently in private
          beta, as we are still working on building the product.
          <br />
          <br />
          Please enjoy <strong>Neuramance Chat</strong> in the meantime, as we
          continously push updates & improvements to it as well.
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
