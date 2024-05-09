'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logoutCurrentUser } from '@/lib/auth/actions';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

export default function AccountDropdownMenu({ user }: { user: User }) {
  const [name, setName] = useState<string | null>(null);
  const [avatar_object_url, setAvatarObjectUrl] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  const supabase = createClient();

  const getProfile = useCallback(async () => {
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`name, avatar_url`)
        .eq('id', user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setName(data.name);
        setAvatarObjectUrl(data.avatar_url);
      }
    } catch (error) {
      alert('Error loading user data!');
    } finally {
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from('avatars')
          .download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log('Error downloading image: ', error);
      }
    }

    if (avatar_object_url) downloadImage(avatar_object_url);
  }, [avatar_object_url, supabase]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="relative h-7 w-7 cursor-pointer">
          <AvatarImage src={avatar_url || '/fallback-avatar.png'} />
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
