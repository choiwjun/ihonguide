import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * OAuth 콜백 라우트
 * Supabase OAuth 인증 후 리다이렉트되는 엔드포인트
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  // OAuth 에러 처리
  if (error) {
    console.error('OAuth error:', error, errorDescription);
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(errorDescription || error)}`
    );
  }

  // code가 없으면 에러
  if (!code) {
    console.error('No code provided in OAuth callback');
    return NextResponse.redirect(`${origin}/login?error=no_code`);
  }

  try {
    const supabase = await createClient();

    // OAuth 코드를 세션으로 교환
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error('Error exchanging code for session:', exchangeError.message);
      return NextResponse.redirect(
        `${origin}/login?error=${encodeURIComponent(exchangeError.message)}`
      );
    }

    // 성공 시 next 페이지로 리다이렉트
    return NextResponse.redirect(`${origin}${next}`);
  } catch (err) {
    console.error('Unexpected error in OAuth callback:', err);
    return NextResponse.redirect(`${origin}/login?error=unexpected`);
  }
}
