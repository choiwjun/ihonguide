/**
 * InternationalDivorceForm Usage Example
 *
 * This example shows how to use the InternationalDivorceForm component
 * in a page or parent component.
 */

'use client';

import { useState } from 'react';
import { InternationalDivorceForm } from '@/components/simulator';
import type { InternationalDivorceInput } from '@/types/internationalDivorceSimulator';

export function InternationalDivorceSimulatorPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (data: InternationalDivorceInput) => {
    setIsSubmitting(true);

    try {
      // Call API to analyze international divorce case
      const response = await fetch('/api/simulator/international-divorce', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('분석에 실패했습니다.');
      }

      const result = await response.json();
      setResult(result);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('분석 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">국제이혼 시뮬레이터</h1>

        <InternationalDivorceForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />

        {result && (
          <div className="mt-8">
            {/* Display result here */}
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
