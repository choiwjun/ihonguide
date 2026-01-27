'use client';

/**
 * 양육비 계산기 페이지
 */

import { useCallback } from 'react';
import { useCalculatorStore } from '@/stores';
import { Container } from '@/components/layout';
import { CalculatorForm, CalculatorResult } from '@/components/calculator';

export default function CalculatorPage() {
  const {
    result,
    isCalculating,
    error,
    getInput,
    setResult,
    setIsCalculating,
    setError,
    reset,
  } = useCalculatorStore();

  // 계산 실행
  const handleCalculate = useCallback(async () => {
    setIsCalculating(true);
    setError(null);

    try {
      const input = getInput();

      const response = await fetch('/api/calculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '계산 처리 중 오류가 발생했습니다.');
      }

      setResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '계산 처리 중 오류가 발생했습니다.');
    } finally {
      setIsCalculating(false);
    }
  }, [getInput, setResult, setIsCalculating, setError]);

  // 재계산 (폼으로 돌아가기)
  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <Container size="md" className="py-8">
      {!result && (
        <>
          <CalculatorForm
            onCalculate={handleCalculate}
            isCalculating={isCalculating}
          />

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
        </>
      )}

      {result && (
        <CalculatorResult result={result} onReset={handleReset} />
      )}
    </Container>
  );
}
