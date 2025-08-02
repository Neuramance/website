'use server';

import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';
import { logError } from '@/lib/utils/logger';

export async function loginWithGoogle() {
  const supabase = createClient();

  // Determine the correct redirect URL based on environment
  const isProduction = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
    (isProduction ? 'https://www.neuramance.com' : 'http://localhost:3000');
  
  const redirectUrl = `${baseUrl}/auth/callback`;
  
  console.log(`OAuth redirect URL: ${redirectUrl} (env: ${process.env.VERCEL_ENV || process.env.NODE_ENV})`);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) {
    logError('Google OAuth login failed', error, 'auth');
    redirect('/error');
  }

  if (data.url) {
    redirect(data.url); // redirect to Google OAuth endpoint URL
  }
}

export async function loginWithMagicLink(formData: FormData) {
  const supabase = createClient();

  const userEmail = formData.get('email') as string;

  // Determine the correct redirect URL based on environment
  const isProduction = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
    (isProduction ? 'https://www.neuramance.com' : 'http://localhost:3000');
  
  console.log(`Magic Link redirect URL: ${baseUrl} (env: ${process.env.VERCEL_ENV || process.env.NODE_ENV})`);

  const { data, error } = await supabase.auth.signInWithOtp({
    email: userEmail,
    options: {
      shouldCreateUser: true,
      // supabase email template uses { .RedirectTo } for /auth/confirm & redirect
      emailRedirectTo: baseUrl,
    },
  });

  if (error) {
    logError('Magic Link login failed', error, 'auth');
    redirect('/error');
  }
}

export async function logoutCurrentUser() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    logError('Logout failed', error, 'auth');
  } else {
    redirect('/login');
  }
}
