'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

/**
 * Header 컴포넌트
 * 참조: docs/05-DesignSystem.md 섹션 7
 */
export function Header() {
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

          {/* Navigation - will be implemented in Task 1.7.3 */}
          <nav className="hidden md:flex items-center gap-6">
            {/* Placeholder for nav items */}
          </nav>

          {/* Auth buttons - will be implemented in Task 1.7.4 */}
          <div className="flex items-center gap-3">
            {/* Placeholder for auth UI */}
          </div>
        </div>
      </div>
    </header>
  );
}
