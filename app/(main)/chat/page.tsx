import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function PrivatePage() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden"></div>
    </div>
  );
}
