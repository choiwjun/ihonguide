'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';

const NAV_ITEMS = [
  { href: '/diagnosis', label: '이혼 유형 진단' },
  { href: '/calculator', label: '양육비 계산기' },
  { href: '/blog', label: '블로그' },
  { href: '/consultation', label: '상담 신청' },
];

/**
 * Header 컴포넌트
 * Light Transparency Variant 3 (Ihon Guide Design System)
 */
export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        'sticky top-0 z-50',
        'bg-white/70 backdrop-blur-md',
        'border-b border-stone-200/50'
      )}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#0f766e]/10 rounded flex items-center justify-center">
              <svg className="w-5 h-5 text-[#0f766e]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3L4 9v12h16V9l-8-6zM6 19V9.5l6-4.5 6 4.5V19H6z"/>
              </svg>
            </div>
            <span className="font-bold text-lg text-slate-800">이혼준비</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'text-[#0f766e]'
                    : 'text-slate-500 hover:text-[#0f766e]'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className={cn(
              'md:hidden p-2 rounded-lg transition-colors',
              isMobileMenuOpen ? 'bg-stone-100' : 'hover:bg-stone-50'
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          >
            <svg
              className="w-6 h-6 text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
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

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-stone-200/50">
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-3 text-base font-medium rounded-lg transition-all duration-200',
                    pathname === item.href
                      ? 'bg-[#f0fdfa] text-[#0f766e]'
                      : 'text-slate-600 hover:bg-stone-50'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
