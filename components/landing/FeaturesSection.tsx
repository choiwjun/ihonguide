'use client';

/**
 * 기능 섹션 컴포넌트 - Bento Grid Layout
 * Light Transparency Variant 3 (Ihon Guide Design System)
 */

import Link from 'next/link';

export function FeaturesSection() {
  return (
    <section className="w-full py-20 lg:py-32 bg-[#F9F8F6]" aria-labelledby="features-heading">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 id="features-heading" className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            데이터로 무장한 <span className="text-[#0f766e]">강력한 도구들</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            변호사 상담 전, 스스로 상황을 객관적으로 파악할 수 있는 전문 도구들을 제공합니다.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)] max-w-[1200px] mx-auto">
          {/* Card 1: 재산분할 시뮬레이터 - Large (2 cols) */}
          <Link href="/calculator" className="md:col-span-2 group">
            <div className="h-full bg-white/65 backdrop-blur-[16px] border border-white/60 rounded-2xl p-8 transition-all duration-300 relative overflow-hidden hover:shadow-[0_10px_40px_-10px_rgba(15,118,110,0.15)] hover:border-[#0f766e]/20">
              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0f766e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center h-full">
                <div className="flex-1 space-y-4">
                  <div className="h-10 w-10 rounded-lg bg-[#0f766e]/10 flex items-center justify-center text-[#0f766e] mb-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">재산분할 시뮬레이터</h3>
                  <p className="text-slate-500">
                    부동산, 예금, 주식 등 복잡한 자산을 입력하면 기여도에 따른 분할 비율을 시각적으로 분석해드립니다.
                  </p>
                  <span className="inline-flex items-center text-[#0f766e] font-semibold text-sm group-hover:underline mt-2">
                    시뮬레이션 시작하기
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>

                {/* Pie Chart Visualization */}
                <div className="w-full md:w-1/2 aspect-video bg-white/50 rounded-lg border border-slate-100 relative overflow-hidden flex items-center justify-center shadow-inner">
                  <div className="relative w-32 h-32">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90" aria-hidden="true">
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#0f766e" strokeWidth="3" strokeDasharray="60, 100" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-xl font-bold text-slate-800">60%</span>
                      <span className="text-[10px] text-slate-400 uppercase">My Share</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Card 2: 양육비 계산기 */}
          <Link href="/calculator" className="group">
            <div className="h-full bg-white/65 backdrop-blur-[16px] border border-white/60 rounded-2xl p-6 transition-all duration-300 relative hover:shadow-[0_10px_40px_-10px_rgba(15,118,110,0.15)] hover:border-[#0f766e]/20">
              <div className="h-10 w-10 rounded-lg bg-slate-600/10 flex items-center justify-center text-slate-600 mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">양육비 계산기</h3>
              <p className="text-slate-500 text-sm mb-6">
                부부 합산 소득과 자녀 나이를 기준으로 서울가정법원 산정 기준표에 맞춘 양육비를 자동 산출합니다.
              </p>

              {/* Mini Calculator Preview */}
              <div className="bg-white rounded-lg p-3 border border-slate-100 shadow-sm">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>합산 소득</span>
                  <span>₩ 7,000,000</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mb-3">
                  <div className="bg-slate-600 h-1.5 rounded-full w-2/3" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400 font-medium">예상 양육비</span>
                  <span className="text-sm font-bold text-slate-800">₩ 1,850,000</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Card 3: 스마트 체크리스트 */}
          <button
            type="button"
            onClick={() => alert('업데이트 예정입니다.')}
            className="group text-left w-full"
          >
            <div className="h-full bg-white/65 backdrop-blur-[16px] border border-white/60 rounded-2xl p-6 transition-all duration-300 relative hover:shadow-[0_10px_40px_-10px_rgba(15,118,110,0.15)] hover:border-[#0f766e]/20">
              <div className="h-10 w-10 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-600 mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">스마트 체크리스트</h3>
              <p className="text-slate-500 text-sm mb-6">
                놓치기 쉬운 필수 서류와 증거 수집 가이드를 단계별로 제공하여 소송 준비를 돕습니다.
              </p>

              {/* Checklist Preview */}
              <ul className="space-y-2">
                <li className="flex items-center gap-3 text-sm text-slate-600">
                  <svg className="w-5 h-5 text-[#0f766e]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>혼인관계증명서 발급</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-600">
                  <svg className="w-5 h-5 text-[#0f766e]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>금융거래내역 확보 (최근 3년)</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-400">
                  <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 20 20" stroke="currentColor" aria-hidden="true">
                    <circle cx="10" cy="10" r="8" strokeWidth="2" />
                  </svg>
                  <span>부동산 등기부등본 확인</span>
                </li>
              </ul>
            </div>
          </button>

          {/* Card 4: 유사 판례 검색 엔진 - Large (2 cols) */}
          <button
            type="button"
            onClick={() => alert('업데이트 예정입니다.')}
            className="md:col-span-2 group text-left w-full"
          >
            <div className="h-full bg-white/65 backdrop-blur-[16px] border border-white/60 rounded-2xl p-8 transition-all duration-300 relative flex flex-col justify-between hover:shadow-[0_10px_40px_-10px_rgba(15,118,110,0.15)] hover:border-[#0f766e]/20">
              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="h-10 w-10 rounded-lg bg-[#0f766e]/10 flex items-center justify-center text-[#0f766e] mb-4">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">유사 판례 검색 엔진</h3>
                    <p className="text-slate-500 max-w-md">
                      나와 비슷한 상황의 판결문 1만 건 이상을 AI가 분석하여 승소 가능성을 예측합니다.
                    </p>
                  </div>

                  {/* Search Bar Preview */}
                  <div className="hidden sm:block bg-white border border-slate-200 rounded-lg p-1 w-64 shadow-sm">
                    <div className="flex items-center px-3 py-2 border-b border-slate-100 gap-2">
                      <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span className="text-xs text-slate-400">키워드 입력 (예: 사실혼, 특유재산)</span>
                    </div>
                    <div className="p-2 space-y-1">
                      <div className="h-2 bg-slate-100 rounded w-3/4 animate-pulse" />
                      <div className="h-2 bg-slate-100 rounded w-1/2 animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-8">
                  {['#배우자 외도', '#재산 은닉', '#양육권 다툼', '#위자료 산정'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs text-slate-500 hover:border-[#0f766e] hover:text-[#0f766e] transition-colors shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
