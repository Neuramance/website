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
import { BadgePlus, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AccountDropdownMenu({ user }: { user: User }) {
  const [name, setName] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const [avatar_blob_url, setAvatarBlobUrl] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    async function downloadProfile() {
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
          setAvatarUrl(data.avatar_url);
        }
      } catch (error) {
        alert('Error loading user data!');
      } finally {
      }
    }
    if (user.id) downloadProfile();
  }, [user.id, supabase]);

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
        setAvatarBlobUrl(url);
      } catch (error) {
        console.log('Error downloading image: ', error);
      }
    }

    if (avatar_url) downloadImage(avatar_url);
  }, [avatar_url, supabase]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-accent">
          <Avatar className="relative h-7 w-7 cursor-pointer">
            {avatar_blob_url && <AvatarImage src={avatar_blob_url} />}
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2 mt-3 min-w-60">
        <DropdownMenuLabel className="text-base">{name}</DropdownMenuLabel>
        <DropdownMenuLabel className="py-0 pb-2 font-normal text-muted-foreground">
          {user.email}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <Link href={'/account'}>
          <DropdownMenuItem>
            <span>Account Settings</span>
            <Settings className="h-4 w-4" />
          </DropdownMenuItem>
        </Link>
        <Link target="_blank" href={'https://x.com/neuramance'}>
          <DropdownMenuItem>
            <span>Follow on X (Twitter)</span>
            <BadgePlus className="h-4 w-4" />
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logoutCurrentUser()}>
          <span>Log out</span>
          <LogOut className="h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
