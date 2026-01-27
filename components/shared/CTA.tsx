import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import type { ReactNode } from 'react';

interface CTAProps {
  /** CTA 제목 */
  title: string;
  /** CTA 설명 */
  description?: string;
  /** 버튼 텍스트 */
  buttonText: string;
  /** 버튼 링크 */
  href: string;
  /** 배경 변형 */
  variant?: 'default' | 'primary';
  /** 추가 className */
  className?: string;
}

/**
 * CTA (Call to Action) 컴포넌트
 */
export function CTA({
  title,
  description,
  buttonText,
  href,
  variant = 'default',
  className,
}: CTAProps) {
  const variantStyles = {
    default: 'bg-surface',
    primary: 'bg-primary/10',
  };

  return (
    <div
      className={cn(
        'rounded-xl p-6 md:p-8',
        'text-center',
        variantStyles[variant],
        className
      )}
    >
      <h3 className="text-xl font-semibold text-text mb-2">{title}</h3>
      {description && (
        <p className="text-text-secondary mb-4">{description}</p>
      )}
      <Link
        href={href}
        className={cn(
          'inline-flex items-center justify-center',
          'h-10 px-6 font-medium',
          'rounded-lg transition-all duration-200 ease-out',
          'bg-primary text-white hover:bg-primary-dark'
        )}
      >
        {buttonText}
      </Link>
    </div>
  );
}
