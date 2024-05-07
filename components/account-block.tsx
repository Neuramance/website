'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { LogOut, Settings } from 'lucide-react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

const supabase = createClient();

async function handleLogout(router: AppRouterInstance | string[]) {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Logout failed:', error);
  } else {
    router.push('/login');
  }
}

export default function AccountBlock({ user }: { user: User | null }) {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Avatar className="relative h-7 w-7 cursor-pointer">
              <AvatarImage src="/fallback-avatar.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-2 mt-3 min-w-60">
            <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={'/account'}>
              <DropdownMenuItem>
                <span>Account Settings</span>
                <Settings className="h-4 w-4" />
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={async () => await handleLogout(router)}>
              <span>Log out</span>
              <LogOut className="h-4 w-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Link href="/login">
            <Button size="nav" variant="secondary">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="nav" variant="white">
              Sign up
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
