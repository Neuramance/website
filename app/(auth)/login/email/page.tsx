import { EmailAuthForm } from '@/components/auth';
import AuthNav from '@/components/auth-nav';

export default async function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <AuthNav />
      <EmailAuthForm title="Log in to Neuramance" />
    </div>
  );
}
