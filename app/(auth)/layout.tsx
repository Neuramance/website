import { createClient } from '@/lib/supabase/server';
import '@/styles/global.css';
import { redirect } from 'next/navigation';

import AuthNav from '@/components/auth-nav';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (!error && data?.user) {
    redirect('/account');
  }

  return (
    <div className="min-h-screen">
      <AuthNav />
      {children}
    </div>
  );
}
