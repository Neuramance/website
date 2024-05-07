import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server';

export default async function UserStatus() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="absolute right-24 top-24 z-50 flex flex-col gap-1 rounded-md border border-border bg-black p-4 text-green-500 shadow-md">
      {user ? (
        <>
          <p className="font-bold">Logged in</p>
          <p>{user.id}</p>
          <p>{user.email}</p>
          <div className="mt-2 flex">
            <form action="/auth/signout" method="post">
              <Button size="nav" variant="secondary" className="text-white">
                Log out
              </Button>
            </form>
          </div>
        </>
      ) : (
        'Logged out'
      )}
    </div>
  );
}
