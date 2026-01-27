'use client';

/**
 * 진단 시작 화면 컴포넌트
 */

import { Button } from '@/components/ui';
import { Card } from '@/components/ui';

interface DiagnosisStartProps {
  onStart: () => void;
}

export function DiagnosisStart({ onStart }: DiagnosisStartProps) {
  return (
    <Card className="max-w-lg mx-auto text-center">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">
            이혼 유형 진단
          </h1>
          <p className="text-gray-600">
            간단한 질문에 답하고 나에게 맞는 이혼 유형을 알아보세요
          </p>
        </div>

        <div className="py-4 space-y-4">
          <div className="flex items-center gap-3 text-left">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
              <span className="text-brand-primary font-medium">1</span>
            </div>
            <p className="text-gray-700">10개의 간단한 질문에 답변합니다</p>
          </div>
          <div className="flex items-center gap-3 text-left">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
              <span className="text-brand-primary font-medium">2</span>
            </div>
            <p className="text-gray-700">약 3분 정도 소요됩니다</p>
          </div>
          <div className="flex items-center gap-3 text-left">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
              <span className="text-brand-primary font-medium">3</span>
            </div>
            <p className="text-gray-700">협의/조정/소송 중 적합한 유형을 알려드립니다</p>
          </div>
        </div>

        <div className="space-y-3">
          <Button onClick={onStart} size="lg" className="w-full">
            진단 시작하기
          </Button>
          <p className="text-xs text-gray-500">
            * 진단 결과는 참고용이며, 정확한 상담은 전문가와 함께하세요
          </p>
        </div>
      </div>
    </Card>
  );
}
