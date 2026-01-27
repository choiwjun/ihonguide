'use client';

/**
 * 문제-해결 섹션 컴포넌트
 */

export function ProblemSolutionSection() {
  const problems = [
    '어디서부터 시작해야 할지 모르겠어요',
    '양육비가 얼마나 나올지 궁금해요',
    '협의이혼이 가능한지 알고 싶어요',
    '전문가 상담은 비용이 걱정돼요',
  ];

  const solutions = [
    '5분 진단으로 나에게 맞는 이혼 유형 안내',
    '법원 기준표 기반 양육비 계산기 제공',
    '상황별 맞춤 체크리스트 제공',
    '무료 정보 + 필요시 전문가 연결',
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* 섹션 헤더 */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              이런 고민, 해결해드립니다
            </h2>
          </div>

          {/* 비교 레이아웃 */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* 문제 (Before) */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-700">이런 고민이 있다면</span>
              </div>
              <ul className="space-y-4">
                {problems.map((problem, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-red-400 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-gray-600">{problem}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 해결 (After) */}
            <div className="bg-brand-primary/5 rounded-2xl p-6 sm:p-8 border-2 border-brand-primary/20">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-brand-primary/20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-700">이혼가이드가 도와드려요</span>
              </div>
              <ul className="space-y-4">
                {solutions.map((solution, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-brand-primary mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-gray-700">{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
