/**
 * 인증 관련 타입 정의
 */

import type { User as SupabaseUser, Session as SupabaseSession } from '@supabase/supabase-js';

// 사용자 역할
export type UserRole = 'user' | 'admin';

// 소셜 프로바이더
export type OAuthProvider = 'kakao' | 'naver';

// 앱 사용자 타입 (Supabase User 확장)
export interface User {
  id: string;
  email: string | null;
  nickname: string | null;
  avatar_url: string | null;
  role: UserRole;
  provider: OAuthProvider | null;
  created_at: string;
  updated_at: string | null;
}

// 세션 타입
export interface Session {
  user: User;
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

// 인증 상태
export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
}

// 로그인 응답
export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: string | null;
}

// Supabase 타입 재내보내기
export type { SupabaseUser, SupabaseSession };
