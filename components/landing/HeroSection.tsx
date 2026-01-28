'use client';

/**
 * Hero 섹션 컴포넌트
 * Light Transparency Variant 3 (Ihon Guide Design System)
 */

import Link from 'next/link';
import { Button } from '@/components/ui';

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F9F8F6]">
      {/* Background Blur Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0f766e]/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="relative container mx-auto px-6 py-20 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="flex flex-col gap-8 flex-1 z-10 text-center lg:text-left">
            {/* Live Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#0f766e]/20 bg-white/50 backdrop-blur-sm w-fit mx-auto lg:mx-0 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0f766e] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0f766e]" />
              </span>
              <span className="text-[#0f766e] text-xs font-semibold tracking-wider uppercase">
                Live Data Analysis
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.15] tracking-tight text-slate-900">
              복잡한 이혼 준비,
              <br />
              이제 <span className="text-[#0f766e] underline decoration-[#0f766e]/20 underline-offset-8 decoration-4">데이터</span>로 투명하게
            </h1>

            {/* Description */}
            <p className="text-slate-500 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              감정에 치우치지 않는 정확한 판단. 15,000건 이상의 판례 빅데이터가 당신의 정당한 권리를 지켜드립니다.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
              <Link href="/diagnosis" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto group">
                  무료 진단 시작하기
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
              <Link href="/guide" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  사용법 보기
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side - Diagnosis Result Preview Card */}
          <div className="flex-1 w-full max-w-[500px] lg:max-w-none relative">
            <div className="bg-white/65 backdrop-blur-[16px] border border-white/60 rounded-2xl p-6 relative overflow-hidden group hover:border-[#0f766e]/30 transition-colors duration-500 shadow-[0_10px_30px_-5px_rgba(15,118,110,0.12)]">
              {/* Background Icon */}
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg className="w-16 h-16 text-[#0f766e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>

              <div className="space-y-6 relative z-10">
                {/* Header */}
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm text-slate-500 mb-1 font-medium">이혼 유형 진단 결과</p>
                    <div className="flex items-center gap-3">
                      <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 border border-green-200 text-lg font-bold">
                        협의이혼
                      </span>
                      <span className="text-sm font-normal text-teal-600">권장</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">점수: 26/30</p>
                  </div>
                </div>

                {/* Progress Bars - Diagnosis Categories */}
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium text-slate-500">
                      <span>의사소통 가능성</span>
                      <span>높음</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-100">
                      <div className="h-full bg-[#0f766e] rounded-full w-[90%] animate-pulse" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium text-slate-500">
                      <span>재산분할 합의</span>
                      <span>가능</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-100">
                      <div className="h-full bg-slate-600 rounded-full w-[75%]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium text-slate-500">
                      <span>양육권 합의</span>
                      <span>조율 필요</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-100">
                      <div className="h-full bg-sky-400/80 rounded-full w-[60%]" />
                    </div>
                  </div>
                </div>

                {/* Bottom Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">예상 소요 기간</p>
                    <p className="text-lg font-bold text-slate-800">1 - 3개월</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">응답 문항</p>
                    <p className="text-lg font-bold text-slate-800">10 / 10 완료</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Blur Elements */}
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-[#0f766e]/20 rounded-full opacity-60 -z-10 blur-2xl" />
            <div className="absolute -left-8 top-12 w-40 h-40 bg-sky-200 rounded-full opacity-40 -z-10 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
