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
import { logoutCurrentUser } from '@/lib/auth/actions';
import { User } from '@supabase/supabase-js';
import { LogOut, Settings } from 'lucide-react';
import Link from 'next/link';

export default function AccountDropdownMenu({ user }: { user: User }) {
  return (
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
        <DropdownMenuItem onClick={() => logoutCurrentUser()}>
          <span>Log out</span>
          <LogOut className="h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
