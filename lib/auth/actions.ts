'use server';

import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

export async function loginWithGoogle() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo:
        process.env.VERCEL_ENV === 'production'
          ? 'https://neuramance.com/auth/callback'
          : 'http://localhost:3000/auth/callback',
    },
  });

  if (error) {
    console.log(error);
    redirect('/error');
  }

  if (data.url) {
    redirect(data.url); // redirect to Google OAuth endpoint URL
  }
}

export async function loginWithMagicLink(formData: FormData) {
  const supabase = createClient();

  const userEmail = formData.get('email') as string;

  const { data, error } = await supabase.auth.signInWithOtp({
    email: userEmail,
    options: {
      shouldCreateUser: true,
      // supabase email template uses { .RedirectTo } for /auth/confirm & redirect
      emailRedirectTo:
        process.env.VERCEL_ENV === 'production'
          ? 'https://neuramance.com'
          : 'http://localhost:3000',
    },
  });

  if (error) {
    console.log(error);
    redirect('/error');
  }
}

export async function logoutCurrentUser() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Logout failed:', error);
  } else {
    redirect('/login');
  }
}
