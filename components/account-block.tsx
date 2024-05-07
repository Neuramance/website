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
    <div className="flex gap-2">
      {user ? (
        <AccountDropdownMenu user={user} />
      ) : (
        <>
          <Link href="/login">
            <Button size="nav" variant="secondary" className="gap-1">
              <LogIn className="h-3 w-3" />
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="nav" className="gap-1">
              <Plus className="h-3 w-3" />
              Sign up
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
