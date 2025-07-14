import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';

// Lazy load AccountForm to reduce initial bundle size
const AccountForm = dynamic(() => import('./account-form'), {
  loading: () => <div className="flex items-center justify-center p-8">Loading account...</div>,
  ssr: false
});

export default async function PrivatePage() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    redirect('/login');
  }

  return <AccountForm user={user} />;
}
