/**
 * 인증 액션 함수들
 */

import { createClient } from '@/lib/supabase/client';
import type { OAuthProvider } from '@/types/auth';

/**
 * OAuth 로그인을 위한 리다이렉트 URL 생성
 */
function getRedirectUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  return `${baseUrl}/auth/callback`;
}

/**
 * 카카오 OAuth로 로그인
 */
export async function signInWithKakao() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: getRedirectUrl(),
    },
  });

  if (error) {
    console.error('Kakao login error:', error.message);
    return { error: error.message };
  }

  return { data };
}

/**
 * 네이버 OAuth로 로그인
 */
export async function signInWithNaver() {
  const supabase = createClient();

  // Supabase는 네이버를 직접 지원하지 않으므로 커스텀 OAuth 사용
  // 네이버는 Supabase에서 지원하지 않아 별도 구현 필요
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao', // TODO: 네이버 커스텀 OAuth 설정 필요
    options: {
      redirectTo: getRedirectUrl(),
    },
  });

  if (error) {
    console.error('Naver login error:', error.message);
    return { error: error.message };
  }

  return { data };
}

/**
 * 로그아웃
 */
export async function signOut() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Sign out error:', error.message);
    return { error: error.message };
  }

  // 로그아웃 후 홈으로 리다이렉트
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }

  return { success: true };
}

/**
 * 현재 세션 가져오기
 */
export async function getSession() {
  const supabase = createClient();

  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Get session error:', error.message);
    return { session: null, error: error.message };
  }

  return { session, error: null };
}

/**
 * 현재 사용자 가져오기
 */
export async function getUser() {
  const supabase = createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Get user error:', error.message);
    return { user: null, error: error.message };
  }

  return { user, error: null };
}
