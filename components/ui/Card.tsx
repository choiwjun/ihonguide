import { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import type { CardProps } from '@/types';

/**
 * Card 컴포넌트
 * Light Transparency Variant 3 (Ihon Guide Design System)
 * Glass Card Effect with Backdrop Blur
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, interactive = false, padding = 'md', className, ...props }, ref) => {
    const paddingStyles = {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(
          // Glass Card Base styles
          'bg-white/65',
          'backdrop-blur-[16px]',
          'rounded-2xl',
          'border border-white/60',
          'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_2px_4px_-1px_rgba(0,0,0,0.02)]',
          // Padding
          paddingStyles[padding],
          // Interactive styles
          interactive && [
            'cursor-pointer',
            'transition-all duration-300',
            'hover:shadow-[0_10px_40px_-10px_rgba(15,118,110,0.15)]',
            'hover:border-[#0f766e]/20',
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
