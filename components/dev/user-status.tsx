'use client';

import { Button } from '@/components/ui/button';
import useUser from '@/lib/auth/user';

export default function UserStatus() {
  const user = useUser();

  return (
    <div className="absolute right-24 top-24 z-50 flex flex-col gap-3 rounded-md border border-border bg-black p-4 text-green-500 shadow-md">
      {user ? (
        <>
          <p className="font-bold">Logged in</p>
          <p>{user.id}</p>
          <p>{user.email}</p>
          <form action="/auth/signout" method="post">
            <Button size="nav" variant="secondary" className="text-white">
              Log out
            </Button>
          </form>
        </>
      ) : (
        'Logged out'
      )}
    </div>
  );
}
