import AuthNav from '@/components/auth-nav';
import EmailAuth from '@/components/email-auth';

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <AuthNav />
      <EmailAuth title="Log in to Neuramance" />
    </main>
  );
}
