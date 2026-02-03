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

      // 응답이 비어있는지 확인
      const text = await response.text();
      if (!text) {
        throw new Error('서버 응답이 비어있습니다. 잠시 후 다시 시도해주세요.');
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error('서버 응답을 처리할 수 없습니다. 잠시 후 다시 시도해주세요.');
      }

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
