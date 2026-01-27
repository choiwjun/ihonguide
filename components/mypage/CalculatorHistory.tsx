'use client';

/**
 * 양육비 계산 결과 히스토리 컴포넌트
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, Button } from '@/components/ui';

interface CalculatorResult {
  id: string;
  input: {
    parent1Income: number;
    parent2Income: number;
    childrenCount: number;
  };
  result: {
    nonCustodialPayment: number;
  };
  createdAt: string;
}

export function CalculatorHistory() {
  const [results, setResults] = useState<CalculatorResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: API에서 계산 결과 불러오기
    // 현재는 로컬 스토리지에서 불러옴
    const savedResults = localStorage.getItem('calculatorHistory');
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <Card>
        <div className="text-center py-8 text-gray-500">불러오는 중...</div>
      </Card>
    );
  }

  if (results.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">아직 계산 결과가 없습니다.</p>
          <Link href="/calculator">
            <Button variant="secondary" size="sm">
              양육비 계산하기
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
              <p className="font-semibold text-brand-primary">
                월 {result.result.nonCustodialPayment.toLocaleString()}원
              </p>
              <p className="text-sm text-gray-600 mt-1">
                자녀 {result.input.childrenCount}명 •
                부모1 소득 {(result.input.parent1Income / 10000).toFixed(0)}만원 •
                부모2 소득 {(result.input.parent2Income / 10000).toFixed(0)}만원
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
