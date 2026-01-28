import { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import type { ButtonProps } from '@/types';
import { BUTTON_SIZES } from '@/types';

/**
 * Button 컴포넌트
 * Light Transparency Variant 3 (Ihon Guide Design System)
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
    const sizeStyles = {
      sm: 'h-9 px-5 text-sm gap-1.5',
      md: 'h-11 px-6 text-base gap-2',
      lg: 'h-12 px-8 text-lg gap-2.5',
    };

    const variantStyles = {
      primary: cn(
        'bg-[#0f766e] text-white',
        'hover:bg-[#115e59]',
        'shadow-[0_4px_20px_-2px_rgba(15,118,110,0.08),0_0_8px_-2px_rgba(0,0,0,0.02)]',
        'hover:shadow-[0_10px_30px_-5px_rgba(15,118,110,0.12),0_0_15px_-3px_rgba(0,0,0,0.03)]',
        'active:scale-[0.98]'
      ),
      secondary: cn(
        'bg-white text-slate-600',
        'border border-slate-300',
        'hover:border-[#0f766e] hover:text-[#0f766e]',
        'shadow-sm',
        'active:scale-[0.98]'
      ),
      ghost: cn(
        'bg-transparent text-slate-500',
        'hover:text-[#0f766e] hover:bg-[#0f766e]/5',
        'active:scale-[0.98]'
      ),
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center',
          'rounded-lg font-bold',
          'transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f766e] focus-visible:ring-offset-2',
          'disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none',
          // Size styles
          sizeStyles[size],
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
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
