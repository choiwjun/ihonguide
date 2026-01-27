import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

const FOOTER_LINKS = [
  { href: '/privacy', label: '개인정보처리방침' },
  { href: '/terms', label: '이용약관' },
  { href: '/contact', label: '문의하기' },
];

/**
 * Footer 컴포넌트
 * 참조: docs/05-DesignSystem.md 섹션 7
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('bg-surface border-t border-border')}>
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-text-muted">
            © {currentYear} 이혼준비. All rights reserved.
          </p>

          {/* Links */}
          <nav className="flex flex-wrap gap-4">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact info */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-sm text-text-muted">
            문의: support@ihonguide.com
          </p>
        </div>
      </div>
    </footer>
  );
}
