'use client';

/**
 * 관리자 레이아웃
 * Light Transparency Design System
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Container } from '@/components/layout';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const adminMenuItems = [
  { href: '/admin', label: '대시보드', icon: 'dashboard' },
  { href: '/admin/consultations', label: '상담 관리', icon: 'chat' },
  { href: '/admin/blog', label: '블로그 관리', icon: 'document' },
];

// 세션 유효 시간 (4시간)
const SESSION_DURATION = 4 * 60 * 60 * 1000;

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // 로그인 페이지는 인증 체크 안함
    if (pathname === '/admin/login') {
      setIsAuthenticated(true);
      return;
    }

    // 인증 상태 확인
    const auth = sessionStorage.getItem('adminAuth');
    const authTime = sessionStorage.getItem('adminAuthTime');

    if (auth === 'true' && authTime) {
      const elapsed = Date.now() - parseInt(authTime);
      if (elapsed < SESSION_DURATION) {
        setIsAuthenticated(true);
        return;
      }
    }

    // 인증 안됨 - 로그인 페이지로 이동
    sessionStorage.removeItem('adminAuth');
    sessionStorage.removeItem('adminAuthTime');
    setIsAuthenticated(false);
    router.push('/admin/login');
  }, [pathname, router]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    sessionStorage.removeItem('adminAuthTime');
    router.push('/admin/login');
  };

  // 로그인 페이지는 레이아웃 없이 렌더링
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // 인증 확인 중
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-teal-600/30 border-t-teal-600 rounded-full animate-spin" />
          <p className="mt-4 text-gray-600">확인 중...</p>
        </div>
      </div>
    );
  }

  // 인증 안됨
  if (!isAuthenticated) {
    return null;
  }

  return (
    <Container size="xl" className="py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 사이드바 */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200/60">
              <div className="w-10 h-10 bg-[#0f766e]/10 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-[#0f766e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">관리자</h2>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
            <nav className="space-y-1">
              {adminMenuItems.map((item) => {
                const isActive = pathname === item.href ||
                  (item.href !== '/admin' && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-[#0f766e] text-white shadow-md shadow-[#0f766e]/20'
                        : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'
                    }`}
                  >
                    {item.icon === 'dashboard' && (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    )}
                    {item.icon === 'chat' && (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    )}
                    {item.icon === 'document' && (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* 하단 메뉴 */}
            <div className="mt-6 pt-4 border-t border-gray-200/60 space-y-1">
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-500 hover:bg-gray-100/80 hover:text-gray-700 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                홈으로 돌아가기
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 w-full"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                로그아웃
              </button>
            </div>
          </div>
        </aside>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </Container>
  );
}
