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
      {user ? (
        <AccountDropdownMenu user={user} />
      ) : (
        <>
          <Link href="/login">
            <Button size="nav" variant="secondary" className="gap-1 px-1.5 sm:px-2 sm:pl-2">
              <LogIn className="h-3 w-3 shrink-0" />
              <span className="hidden min-[400px]:inline">Log in</span>
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="nav" className="gap-1 px-1.5 sm:px-2 sm:pl-2">
              <Plus className="h-3 w-3 shrink-0" />
              <span className="hidden min-[400px]:inline">Sign up</span>
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
