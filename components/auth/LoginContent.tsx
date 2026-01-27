'use client';

/**
 * 로그인 모달 내용 컴포넌트
 * 카카오/네이버 소셜 로그인 버튼 포함
 */

import { useState } from 'react';
import { signInWithKakao, signInWithNaver } from '@/lib/auth';

interface LoginContentProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

export function LoginContent({ onSuccess, redirectTo }: LoginContentProps) {
  const [isLoading, setIsLoading] = useState<'kakao' | 'naver' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleKakaoLogin = async () => {
    setIsLoading('kakao');
    setError(null);

    const result = await signInWithKakao();

    if (result.error) {
      setError(result.error);
      setIsLoading(null);
    } else {
      onSuccess?.();
    }
  };

  const handleNaverLogin = async () => {
    setIsLoading('naver');
    setError(null);

    const result = await signInWithNaver();

    if (result.error) {
      setError(result.error);
      setIsLoading(null);
    } else {
      onSuccess?.();
    }
  };

  return (
    <div className="text-center">
      {/* 타이틀 */}
      <h2 id="login-modal-title" className="text-2xl font-bold text-gray-900 mb-2">
        로그인
      </h2>
      <p className="text-gray-600 mb-8">
        간편하게 소셜 계정으로 로그인하세요
      </p>

      {/* 에러 메시지 */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* 소셜 로그인 버튼 */}
      <div className="space-y-3">
        {/* 카카오 로그인 */}
        <button
          type="button"
          onClick={handleKakaoLogin}
          disabled={isLoading !== null}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#FEE500] text-[#191919] font-medium rounded-lg hover:bg-[#FDD835] transition-colors disabled:opacity-50"
          aria-label="카카오 계정으로 로그인"
        >
          {/* 카카오 아이콘 */}
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.67 1.722 5.018 4.337 6.372-.186.69-.676 2.503-.774 2.89-.121.48.176.473.37.345.152-.1 2.42-1.645 3.404-2.318.875.13 1.774.211 2.663.211 5.523 0 10-3.477 10-7.5S17.523 3 12 3z" />
          </svg>
          {isLoading === 'kakao' ? '로그인 중...' : '카카오로 시작하기'}
        </button>

        {/* 네이버 로그인 */}
        <button
          type="button"
          onClick={handleNaverLogin}
          disabled={isLoading !== null}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#03C75A] text-white font-medium rounded-lg hover:bg-[#02B350] transition-colors disabled:opacity-50"
          aria-label="네이버 계정으로 로그인"
        >
          {/* 네이버 아이콘 */}
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z" />
          </svg>
          {isLoading === 'naver' ? '로그인 중...' : '네이버로 시작하기'}
        </button>
      </div>

      {/* 약관 안내 */}
      <p className="mt-6 text-xs text-gray-500">
        로그인 시{' '}
        <a href="/terms" className="underline hover:text-gray-700">
          이용약관
        </a>
        {' '}및{' '}
        <a href="/privacy" className="underline hover:text-gray-700">
          개인정보처리방침
        </a>
        에 동의하게 됩니다.
      </p>
    </div>
  );
}

export default LoginContent;
