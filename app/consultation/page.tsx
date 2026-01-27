'use client';

/**
 * 상담 신청 페이지
 */

import { useState, useCallback } from 'react';
import { Container } from '@/components/layout';
import { ConsultationForm, ConsultationSuccess, type ConsultationFormData } from '@/components/consultation';
import type { ConsultationResult } from '@/types/consultation';

export default function ConsultationPage() {
  const [result, setResult] = useState<ConsultationResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 상담 신청 처리
  const handleSubmit = useCallback(async (formData: ConsultationFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '상담 신청 처리 중 오류가 발생했습니다.');
      }

      setResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '상담 신청 처리 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  // 새로운 상담 신청 (폼으로 돌아가기)
  const handleReset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return (
    <Container size="md" className="py-8">
      {!result && (
        <>
          <ConsultationForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
        </>
      )}

      {result && (
        <ConsultationSuccess result={result} onReset={handleReset} />
      )}
    </Container>
  );
}
