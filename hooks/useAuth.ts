'use client';

/**
 * 인증 상태 관리 훅
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User as SupabaseUser, Session, AuthChangeEvent } from '@supabase/supabase-js';

interface AuthState {
  user: SupabaseUser | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
}

interface UseAuthReturn extends AuthState {
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    error: null,
  });

  const supabase = useMemo(() => createClient(), []);

  // 세션 및 사용자 정보 가져오기
  const fetchSession = useCallback(async () => {
    if (!supabase) {
      setState({
        user: null,
        session: null,
        isLoading: false,
        error: null,
      });
      return;
    }

    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        setState((prev) => ({
          ...prev,
          user: null,
          session: null,
          isLoading: false,
          error: error.message,
        }));
        return;
      }

      setState({
        user: session?.user ?? null,
        session,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        user: null,
        session: null,
        isLoading: false,
        error: err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.',
      }));
    }
  }, [supabase]);

  // 로그아웃
  const signOut = useCallback(async () => {
    if (!supabase) return;

    try {
      await supabase.auth.signOut();
      setState({
        user: null,
        session: null,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : '로그아웃 중 오류가 발생했습니다.',
      }));
    }
  }, [supabase]);

  // 세션 새로고침
  const refresh = useCallback(async () => {
    await fetchSession();
  }, [fetchSession]);

  // 초기 로드 및 인증 상태 변경 구독
  useEffect(() => {
    if (!supabase) {
      setState({
        user: null,
        session: null,
        isLoading: false,
        error: null,
      });
      return;
    }

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        setState({
          user: session?.user ?? null,
          session,
          isLoading: false,
          error: null,
        });
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchSession, supabase]);

  return {
    ...state,
    signOut,
    refresh,
  };
}
