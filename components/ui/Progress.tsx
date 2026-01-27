import { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import type { ProgressBarProps, ProgressStepsProps } from '@/types';

/**
 * ProgressBar 컴포넌트
 * 참조: docs/05-DesignSystem.md 섹션 5.5
 * 접근성: role=progressbar, aria-valuenow
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
        aria-label={`진행률 ${clampedValue}%`}
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
 * 접근성: role=list, aria-current
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
        aria-label={`${total}단계 중 ${current}단계 진행 중`}
        className={cn('flex justify-between', className)}
        {...props}
      >
        {steps.map((step) => {
          const state = getStepState(step);
          return (
            <div
              key={step}
              role="listitem"
              aria-current={state === 'active' ? 'step' : undefined}
              className={cn(
                'w-8 h-8',
                'rounded-full',
                'flex items-center justify-center',
                'text-sm font-medium',
                stepStyles[state]
              )}
            >
              <span className="sr-only">
                {state === 'completed' ? '완료: ' : state === 'active' ? '현재: ' : ''}
                {step}단계
              </span>
              <span aria-hidden="true">{step}</span>
            </div>
          );
        })}
      </div>
    );
  }
);

ProgressSteps.displayName = 'ProgressSteps';
