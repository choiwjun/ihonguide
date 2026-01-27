'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui';

/**
 * Error Boundary 컴포넌트
 * 참조: docs/plan.md 섹션 6
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-text mb-2">
          문제가 발생했습니다
        </h1>
        <p className="text-text-secondary mb-6">
          일시적인 오류가 발생했습니다. 다시 시도해 주세요.
        </p>
        <Button onClick={reset}>다시 시도</Button>
      </div>
    </div>
  );
}
