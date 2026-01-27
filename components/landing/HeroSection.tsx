'use client';

/**
 * Hero 섹션 컴포넌트
 */

import Link from 'next/link';
import { Button } from '@/components/ui';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-brand-primary/5 to-white py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* 헤드라인 */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            이혼, 혼자 고민하지 마세요
          </h1>

          {/* 서브헤드라인 */}
          <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed">
            체계적인 정보와 전문가 도움으로
            <br className="hidden sm:block" />
            현명한 결정을 내릴 수 있도록 도와드립니다
          </p>

          {/* 신뢰 요소 */}
          <ul className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500" aria-label="서비스 특징">
            <li className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              변호사 감수
            </li>
            <li className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              완전 무료
            </li>
            <li className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              개인정보 보호
            </li>
          </ul>

          {/* CTA 버튼 */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/diagnosis">
              <Button size="lg" className="w-full sm:w-auto px-8">
                무료 이혼 유형 진단 시작
              </Button>
            </Link>
            <Link href="/calculator">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8">
                양육비 계산하기
              </Button>
            </Link>
          </div>

          {/* 사용자 통계 */}
          <p className="mt-8 text-sm text-gray-500">
            이미 <strong className="text-brand-primary">10,000명</strong> 이상이 이용했습니다
          </p>
        </div>
      </div>
    </section>
  );
}
