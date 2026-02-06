'use client';

/**
 * 진단 결과 히스토리 컴포넌트
 */

import { useState } from 'react';
import Link from 'next/link';
import { Card, Button } from '@/components/ui';

interface DiagnosisResult {
  id: string;
  result: {
    primaryType: string;
    primaryScore: number;
    recommendation: string;
  };
  createdAt: string;
}

export function DiagnosisHistory() {
  const [results] = useState<DiagnosisResult[]>(() => {
    if (typeof window === 'undefined') {
      return [];
    }

    try {
      const savedResults = localStorage.getItem('diagnosisHistory');
      return savedResults ? (JSON.parse(savedResults) as DiagnosisResult[]) : [];
    } catch {
      return [];
    }
  });

  if (results.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">아직 진단 결과가 없습니다.</p>
          <Link href="/diagnosis">
            <Button variant="secondary" size="sm">
              이혼 유형 진단하기
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <Card key={result.id} className="hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <span className="inline-block px-2 py-1 text-sm font-medium text-brand-primary bg-brand-primary/10 rounded mb-2">
                {result.result.primaryType}
              </span>
              <p className="text-sm text-gray-600 line-clamp-2">
                {result.result.recommendation}
              </p>
            </div>
            <span className="text-xs text-gray-400">
              {new Date(result.createdAt).toLocaleDateString('ko-KR')}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
