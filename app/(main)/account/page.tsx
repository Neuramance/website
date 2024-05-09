import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AccountForm from './account-form';

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
