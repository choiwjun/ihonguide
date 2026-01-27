import { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import type { HTMLAttributes, ReactNode } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** 컨테이너 최대 너비 */
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const CONTAINER_SIZES = {
  sm: 'max-w-xl',      // 640px - 콘텐츠 (블로그)
  md: 'max-w-3xl',     // 768px - 폼, 진단
  lg: 'max-w-5xl',     // 1024px - 기본 페이지
  xl: 'max-w-6xl',     // 1280px - 대시보드
} as const;

/**
 * Container 컴포넌트
 * 참조: docs/05-DesignSystem.md 섹션 7.1
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, size = 'lg', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full mx-auto',
          'px-4 md:px-6 lg:px-8',
          CONTAINER_SIZES[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';
