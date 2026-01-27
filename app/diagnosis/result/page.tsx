'use client';

/**
 * 이혼 유형 진단 결과 페이지
 */

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/layout';
import { Card, Button } from '@/components/ui';
import type { DiagnosisResult } from '@/types/diagnosis';

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sessionId = searchParams.get('sessionId');

  useEffect(() => {
    // sessionId가 없으면 진단 페이지로 리다이렉트
    if (!sessionId) {
      router.replace('/diagnosis');
      return;
    }

    // 세션 스토리지에서 결과 가져오기 (API 응답 캐시)
    const cachedResult = sessionStorage.getItem(`diagnosis_${sessionId}`);
    if (cachedResult) {
      try {
        setResult(JSON.parse(cachedResult));
        setLoading(false);
        return;
      } catch {
        // 파싱 실패 시 무시
      }
    }

    // TODO: API에서 결과 가져오기 (GET /api/diagnosis/:sessionId)
    // 현재는 로컬 스토리지에 저장된 마지막 결과 사용
    const lastResult = sessionStorage.getItem('lastDiagnosisResult');
    if (lastResult) {
      try {
        setResult(JSON.parse(lastResult));
      } catch {
        setError('결과를 불러올 수 없습니다.');
      }
    } else {
      setError('결과를 찾을 수 없습니다.');
    }
    setLoading(false);
  }, [sessionId, router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600">결과를 불러오는 중...</p>
      </div>
    );
  }

  if (error || !result) {
    return (
      <Card className="text-center py-12">
        <div className="space-y-4">
          <p className="text-gray-600">{error || '결과를 찾을 수 없습니다.'}</p>
          <Button onClick={() => router.push('/diagnosis')}>다시 진단하기</Button>
        </div>
      </Card>
    );
  }

  const resultTypeLabels = {
    협의: '협의이혼',
    조정: '조정이혼',
    소송: '소송이혼',
  };

  const resultTypeColors = {
    협의: 'bg-green-100 text-green-800 border-green-200',
    조정: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    소송: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <div className="space-y-6">
      {/* 결과 요약 */}
      <Card className="text-center">
        <div className="space-y-4">
          <p className="text-sm text-gray-500">진단 결과</p>
          <div
            className={`inline-block px-6 py-3 rounded-full border-2 ${resultTypeColors[result.resultType]}`}
          >
            <span className="text-2xl font-bold">
              {resultTypeLabels[result.resultType]}
            </span>
          </div>
          <div className="flex justify-center gap-4 text-sm text-gray-600">
            <span>점수: {result.score}점</span>
            <span>|</span>
            <span>응답: {result.answeredQuestions}/{result.totalQuestions}문항</span>
          </div>
        </div>
      </Card>

      {/* 상세 결과 */}
      <Card>
        <div className="space-y-6">
          {/* 추천 사유 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              진단 결과 분석
            </h3>
            <ul className="space-y-2">
              {result.detail.reasons.map((reason, index) => (
                <li key={index} className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 다음 단계 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              권장 다음 단계
            </h3>
            <ol className="space-y-2">
              {result.detail.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* 예상 기간 */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-gray-600">
                예상 소요 기간: <strong>{result.detail.estimatedDuration}</strong>
              </span>
            </div>
            {result.detail.additionalInfo && (
              <p className="mt-2 text-sm text-gray-500">
                {result.detail.additionalInfo}
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* CTA 버튼 */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 text-center">
            다음으로 해볼 수 있어요
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/calculator" className="block">
              <Button variant="secondary" className="w-full">
                양육비 계산해보기
              </Button>
            </Link>
            <Link href="/consultation" className="block">
              <Button className="w-full">전문가 상담 신청</Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* 재진단 */}
      <div className="text-center">
        <Link href="/diagnosis">
          <Button variant="ghost" className="text-gray-500">
            다시 진단하기
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function DiagnosisResultPage() {
  return (
    <Container size="md" className="py-8">
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-600">결과를 불러오는 중...</p>
          </div>
        }
      >
        <ResultContent />
      </Suspense>
    </Container>
  );
}
