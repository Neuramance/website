import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { validateRedirectUrl } from '@/lib/utils/url-validation';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const nextParam = searchParams.get('next') ?? '/';
  
  // Validate the redirect URL to prevent open redirect attacks
  const next = validateRedirectUrl(nextParam, origin);

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/error`);
}
