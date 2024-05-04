'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

const isProd = process.env.VERCEL_ENV === 'production';

export async function loginWithMagicLink(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const userEmail = formData.get('email') as string;

  const { data, error } = await supabase.auth.signInWithOtp({
    email: userEmail,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: isProd
        ? 'https://neuramance.com'
        : 'http://localhost:3000',
    },
  });

  if (error) {
    console.log(error);
    redirect('/error');
  }
}
