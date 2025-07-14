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
import { createClient } from '@/lib/supabase/client';
import { logError } from '@/lib/utils/logger';
import { User } from '@supabase/supabase-js';
import { BadgePlus, LogOut, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ProfileData {
  full_name: string | null;
  avatar_url: string | null;
}

export default function AccountDropdownMenu({ user }: { user: User }) {
  const [full_name, setFullName] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const [avatar_blob_url, setAvatarBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    async function downloadProfile() {
      try {
        const { data, error, status } = await supabase
          .from('profiles')
          .select(`full_name, avatar_url`)
          .eq('id', user?.id)
          .single() as { data: ProfileData | null; error: any; status: number };

        if (error && status !== 406) {
          logError('Error loading profile', error, 'AccountDropdown');
          throw error;
        }

        if (data) {
          setFullName(data.full_name);
          setAvatarUrl(data.avatar_url);
        }
      } catch (error) {
        alert('Error loading user data!');
      } finally {
      }
    }
    if (user.id) downloadProfile();
  }, [user.id]);

  useEffect(() => {
    async function downloadImage(path: string) {
      const supabase = createClient();
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
        logError('Error downloading avatar image', error, 'AccountDropdown');
      }
    }

    if (avatar_url) downloadImage(avatar_url);
  }, [avatar_url]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-accent">
          <div className="border-1 rounded-full border-[#2f3336]">
            <Avatar className="relative h-6 w-6 cursor-pointer">
              {avatar_blob_url && <AvatarImage src={avatar_blob_url} />}
              <AvatarFallback>
                <Image
                  src="/fallback-avatar.png"
                  alt="Default avatar"
                  width={28}
                  height={28}
                  className="object-cover"
                />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-60 mr-[6px] mt-2">
        <DropdownMenuLabel className="text-base">{full_name}</DropdownMenuLabel>
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
            <span>Follow us on X (Twitter)</span>
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
