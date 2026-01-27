import { forwardRef, useId } from 'react';
import { cn } from '@/lib/utils/cn';
import type { InputProps } from '@/types';

/**
 * Input 컴포넌트
 * 참조: docs/05-DesignSystem.md 섹션 5.2
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, fullWidth = false, className, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text-secondary"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            // Base styles
            'h-12 px-4',
            'bg-white',
            'border rounded-lg',
            'text-base text-text',
            'placeholder:text-text-muted',
            'transition-all duration-200 ease-out',
            // Focus styles
            'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
            // Disabled styles
            'disabled:bg-surface disabled:text-text-muted disabled:cursor-not-allowed',
            // Error styles
            error ? 'border-error focus:ring-error/20 focus:border-error' : 'border-border',
            className
          )}
          {...props}
        />
        {hint && !error && (
          <span className="text-xs text-text-muted">{hint}</span>
        )}
        {error && (
          <span className="text-xs text-error">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
