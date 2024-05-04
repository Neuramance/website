// components/UserStatus.tsx
'use client';

import { createClient } from '@/lib/supabase/client';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { FunctionComponent, useEffect, useState } from 'react';

const supabase = createClient();

const UserStatus: FunctionComponent = () => {
  const [userEmail, setUserEmail] = useState<string>('Logged out');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Await the getUser() call and destructure the response
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        // Set initial user email if user is logged in
        if (user && user.email) {
          // Check that user and user.email are not null
          setUserEmail(user.email);
        } else {
          setUserEmail('Logged out');
        }

        if (error) {
          console.error('Failed to fetch user:', error.message);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        if (session && session.user && session.user.email) {
          setUserEmail(session.user.email);
        } else {
          setUserEmail('Logged out');
        }
      },
    );

    // Cleanup on component unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="absolute right-24 top-24 z-50 rounded-md bg-black p-4 text-green-500 shadow-md">
      {userEmail}
    </div>
  );
};

export default UserStatus;
