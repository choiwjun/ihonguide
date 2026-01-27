'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui';

const NAV_ITEMS = [
  { href: '/', label: '홈' },
  { href: '/diagnosis', label: '이혼 유형 진단' },
  { href: '/calculator', label: '양육비 계산기' },
  { href: '/guide', label: '가이드' },
  { href: '/consultation', label: '상담 신청' },
];

/**
 * Header 컴포넌트
 * 참조: docs/05-DesignSystem.md 섹션 7
 */
export function Header() {
  const pathname = usePathname();
  const { user, isLoading, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-40',
        'bg-white/95 backdrop-blur-sm',
        'border-b border-border'
      )}
    >
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-semibold text-lg text-primary">
            이혼준비
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'text-primary'
                    : 'text-text-secondary hover:text-primary'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Auth buttons */}
          <div className="flex items-center gap-3">
            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-3">
              {isLoading ? null : user ? (
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  로그아웃
                </Button>
              ) : (
                <Link
                  href="/login"
                  className={cn(
                    'inline-flex items-center justify-center',
                    'h-8 px-3 text-sm font-medium',
                    'rounded-lg transition-all duration-200 ease-out',
                    'bg-primary text-white hover:bg-primary-dark'
                  )}
                >
                  로그인
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 text-text-secondary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    pathname === item.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-secondary hover:bg-surface'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-4 pt-2 mt-2 border-t border-border">
                {isLoading ? null : user ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    fullWidth
                    onClick={handleLogout}
                  >
                    로그아웃
                  </Button>
                ) : (
                  <Link
                    href="/login"
                    className={cn(
                      'flex items-center justify-center w-full',
                      'h-8 px-3 text-sm font-medium',
                      'rounded-lg transition-all duration-200 ease-out',
                      'bg-primary text-white hover:bg-primary-dark'
                    )}
                  >
                    로그인
                  </Link>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
