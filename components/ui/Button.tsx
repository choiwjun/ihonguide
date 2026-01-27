import { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import type { ButtonProps } from '@/types';
import { BUTTON_SIZES } from '@/types';

/**
 * Button 컴포넌트
 * 참조: docs/05-DesignSystem.md 섹션 5.1
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const sizeStyles = BUTTON_SIZES[size];

    const variantStyles = {
      primary: 'bg-primary text-white hover:bg-primary-dark active:scale-[0.98]',
      secondary:
        'bg-surface text-text border border-border hover:bg-border',
      ghost: 'bg-transparent text-primary hover:bg-primary/10',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center',
          'rounded-lg font-medium',
          'transition-all duration-200 ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          // Size styles
          sizeStyles.height,
          sizeStyles.padding,
          sizeStyles.fontSize,
          // Variant styles
          variantStyles[variant],
          // Full width
          fullWidth && 'w-full',
          // Custom className
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="animate-spin mr-2">⟳</span>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
