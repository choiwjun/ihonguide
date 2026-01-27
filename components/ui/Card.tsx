import { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import type { CardProps } from '@/types';
import { CARD_PADDINGS } from '@/types';

/**
 * Card 컴포넌트
 * 참조: docs/05-DesignSystem.md 섹션 5.3
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, interactive = false, padding = 'md', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'bg-white',
          'border border-border',
          'rounded-xl',
          'shadow-sm',
          // Padding
          CARD_PADDINGS[padding],
          // Interactive styles
          interactive && [
            'cursor-pointer',
            'transition-all duration-200 ease-out',
            'hover:shadow-md hover:-translate-y-0.5',
          ],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
