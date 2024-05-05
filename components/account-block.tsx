'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useUser from '@/lib/auth/user';
import Link from 'next/link';
import { Button } from './ui/button';

export default function AccountBlock() {
  const user = useUser();
  return (
    <div className="flex gap-2">
      {user ? (
        <Avatar className="relative h-7 w-7 cursor-pointer">
          <AvatarImage src="https://github.com/wiresv.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
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
