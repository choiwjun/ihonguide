'use client';

/**
 * 진단 진행률 컴포넌트
 */

import { ProgressBar, ProgressSteps } from '@/components/ui';

interface DiagnosisProgressProps {
  current: number;
  total: number;
}

export function DiagnosisProgress({ current, total }: DiagnosisProgressProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <ProgressSteps current={current} total={total} />
        <span className="text-sm font-medium text-gray-600">
          {percentage}% 완료
        </span>
      </div>
      <ProgressBar value={percentage} />
    </div>
  );
}
