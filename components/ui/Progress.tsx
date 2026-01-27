import { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import type { ProgressBarProps, ProgressStepsProps } from '@/types';

/**
 * ProgressBar 컴포넌트
 * 참조: docs/05-DesignSystem.md 섹션 5.5
 */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ value, className, ...props }, ref) => {
    const clampedValue = Math.min(100, Math.max(0, value));

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn(
          'h-2',
          'bg-surface',
          'rounded',
          'overflow-hidden',
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'h-full',
            'bg-primary',
            'rounded',
            'transition-all duration-300 ease-out'
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

/**
 * ProgressSteps 컴포넌트
 * 참조: docs/05-DesignSystem.md 섹션 5.5
 */
export const ProgressSteps = forwardRef<HTMLDivElement, ProgressStepsProps>(
  ({ current, total, className, ...props }, ref) => {
    const steps = Array.from({ length: total }, (_, i) => i + 1);

    const getStepState = (step: number) => {
      if (step < current) return 'completed';
      if (step === current) return 'active';
      return 'pending';
    };

    const stepStyles = {
      completed: 'bg-primary-light text-primary-dark',
      active: 'bg-primary text-white',
      pending: 'bg-surface text-text-muted',
    };

    return (
      <div
        ref={ref}
        role="list"
        className={cn('flex justify-between', className)}
        {...props}
      >
        {steps.map((step) => {
          const state = getStepState(step);
          return (
            <div
              key={step}
              role="listitem"
              className={cn(
                'w-8 h-8',
                'rounded-full',
                'flex items-center justify-center',
                'text-sm font-medium',
                stepStyles[state]
              )}
            >
              {step}
            </div>
          );
        })}
      </div>
    );
  }
);

ProgressSteps.displayName = 'ProgressSteps';
