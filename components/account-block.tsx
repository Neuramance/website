import { createClient } from '@/lib/supabase/server';
import { LogIn, Plus } from 'lucide-react';
import Link from 'next/link';
import AccountDropdownMenu from './account-dropdown';
import { Button } from './ui/button';

export default async function AccountBlock() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <div className="flex gap-0.5 sm:gap-1">
      {user && <AccountDropdownMenu user={user} />}
    </div>
  );
}
