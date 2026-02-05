'use client';

/**
 * 상간녀 손해배상 청구 시뮬레이터 메인 페이지
 * Adultery Lawsuit Simulator Main Page
 *
 * @TASK Adultery Simulator Main Page
 * @SPEC Light Transparency Design System
 *
 * Features:
 * - Client component with Zustand store integration
 * - Form submission handling
 * - Loading and error states
 * - Hero section with page title and description
 * - Information sections
 * - SEO optimization
 * - Responsive design
 */

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import { jsonLd } from './metadata';
import { Container } from '@/components/layout';
import { Card } from '@/components/ui';
import { AdulterySimulatorForm } from '@/components/simulator/AdulterySimulatorForm';
import { AdulterySimulatorResult } from '@/components/simulator/AdulterySimulatorResult';
import { useAdulterySimulatorStore } from '@/stores/adulterySimulatorStore';
import type { AdulterySimulatorInput } from '@/types/adulterySimulator';

export default function AdulterySimulatorPage() {
  const { input, result, isLoading, error, setInput, calculate, reset } = useAdulterySimulatorStore();
  const resultRef = useRef<HTMLDivElement>(null);

  // 결과가 생성되면 스크롤
  useEffect(() => {
    if (result && resultRef.current) {
      const headerOffset = 80;
      const elementPosition = resultRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, [result]);

  // 폼 제출 핸들러
  const handleSubmit = (data: AdulterySimulatorInput) => {
    setInput(data);
    calculate();
  };

  // 재계산 핸들러
  const handleReset = () => {
    reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 재시도 핸들러
  const handleRetry = () => {
    if (input) {
      calculate();
    }
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="adultery-simulator-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-primary/5 via-brand-primary/10 to-transparent py-12 md:py-16">
        <Container size="lg">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              상간녀 손해배상 청구 시뮬레이터
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              부정행위로 인한 손해배상 청구 가능성과 예상 위자료를 분석합니다.
              입력하신 정보를 바탕으로 소송 가능성을 평가해드립니다.
            </p>

            {/* 주요 특징 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="flex flex-col items-center gap-2 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200">
                <svg className="w-8 h-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-semibold text-gray-900">정확한 분석</span>
                <span className="text-xs text-gray-600">실제 판례 기반</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200">
                <svg className="w-8 h-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-semibold text-gray-900">위자료 산정</span>
                <span className="text-xs text-gray-600">최소~최대 범위</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200">
                <svg className="w-8 h-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-sm font-semibold text-gray-900">리스크 평가</span>
                <span className="text-xs text-gray-600">증거 분석</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <Container size="md" className="py-8 md:py-12">
        <div className="space-y-8">
          {/* 시뮬레이터 폼 */}
          {!result && (
            <AdulterySimulatorForm onSubmit={handleSubmit} isSubmitting={isLoading} />
          )}

          {/* 에러 상태 */}
          {error && (
            <Card className="bg-red-50 border-red-200">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-red-900 mb-2">오류가 발생했습니다</h3>
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleRetry}
                    disabled={isLoading}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? '재시도 중...' : '다시 시도'}
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-white text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                  >
                    처음부터 다시
                  </button>
                </div>
              </div>
            </Card>
          )}

          {/* 로딩 상태 */}
          {isLoading && (
            <Card>
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
                <div className="text-center space-y-2">
                  <p className="text-lg font-semibold text-gray-900">분석 중입니다...</p>
                  <p className="text-sm text-gray-600">
                    입력하신 정보를 바탕으로 소송 가능성을 평가하고 있습니다.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* 결과 표시 */}
          {result && !isLoading && (
            <div ref={resultRef}>
              <AdulterySimulatorResult result={result} onReset={handleReset} />
            </div>
          )}

          {/* 정보 섹션 - 결과가 없을 때만 표시 */}
          {!result && !isLoading && (
            <>
              {/* 상간녀 소송이란? */}
              <Card>
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900">상간녀 소송이란?</h2>
                  <div className="prose prose-sm max-w-none text-gray-700 space-y-3">
                    <p>
                      상간녀 소송은 배우자와 부정행위를 한 제3자(상간자)에게 손해배상을 청구하는 민사 소송입니다.
                      민법 제806조(부당이득)에 따라 혼인 공동생활의 평화가 깨어진 데 대한 정신적 손해를 배상받을 수 있습니다.
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2 mt-4">
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h3 className="text-sm font-semibold text-blue-900 mb-2">성립 요건</h3>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• 유효한 혼인 관계 존재</li>
                          <li>• 고의적인 부정행위</li>
                          <li>• 상간자의 혼인 사실 인식</li>
                          <li>• 혼인 파탄과의 인과관계</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <h3 className="text-sm font-semibold text-purple-900 mb-2">청구 가능 대상</h3>
                        <ul className="text-sm text-purple-800 space-y-1">
                          <li>• 배우자와 관계한 제3자</li>
                          <li>• 기혼 사실을 알고 있었던 경우</li>
                          <li>• 혼인 파탄에 기여한 경우</li>
                          <li>• 소멸시효 3년 이내</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* 언제 이용하나요? */}
              <Card>
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900">언제 이용하나요?</h2>
                  <div className="space-y-3 text-gray-700">
                    <p className="text-sm">
                      다음과 같은 상황에서 본 시뮬레이터를 이용하시면 도움이 됩니다:
                    </p>
                    <div className="grid gap-3">
                      <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                        <svg className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-gray-900">배우자의 부정행위를 확인한 경우</p>
                          <p className="text-xs text-gray-600 mt-1">메시지, 사진, 목격담 등의 증거가 있을 때</p>
                        </div>
                      </div>
                      <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                        <svg className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-gray-900">소송 가능성을 사전에 파악하고 싶을 때</p>
                          <p className="text-xs text-gray-600 mt-1">변호사 상담 전 기초 정보 확인</p>
                        </div>
                      </div>
                      <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                        <svg className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-gray-900">예상 위자료 금액을 알고 싶을 때</p>
                          <p className="text-xs text-gray-600 mt-1">합의 협상 전 기준 금액 파악</p>
                        </div>
                      </div>
                      <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                        <svg className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-gray-900">증거의 법적 유효성을 확인하고 싶을 때</p>
                          <p className="text-xs text-gray-600 mt-1">불법 증거 여부 및 추가 증거 필요성 판단</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* 법적 고지 */}
              <Card className="bg-amber-50 border-amber-200">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-amber-900 mb-2">법적 고지 및 면책사항</h2>
                      <div className="text-sm text-amber-800 space-y-2">
                        <p>
                          <strong>본 시뮬레이터는 참고용 정보 제공 목적입니다.</strong>
                        </p>
                        <ul className="space-y-1 list-disc list-inside">
                          <li>입력하신 정보를 바탕으로 한 예상치이며, 실제 소송 결과와 다를 수 있습니다.</li>
                          <li>법적 자문이나 법률 서비스를 대체할 수 없습니다.</li>
                          <li>개별 사안의 특성에 따라 결과가 크게 달라질 수 있습니다.</li>
                          <li>구체적인 법률 상담은 반드시 가정법률 전문 변호사와 진행하시기 바랍니다.</li>
                          <li>입력하신 정보는 서버에 저장되지 않으며, 브라우저를 닫으면 삭제됩니다.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      </Container>
    </>
  );
}
