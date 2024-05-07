import { EmailAuthForm } from '@/components/auth';
import AuthNav from '@/components/auth-nav';

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <AuthNav />
      <EmailAuthForm title="Log in to Neuramance" />
    </main>
  );
}
