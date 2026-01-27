'use client';

/**
 * CTA(Call-to-Action) 섹션 컴포넌트
 * 최종 행동 유도 섹션
 */

import Link from 'next/link';
import { Button } from '@/components/ui';

export function CTASection() {
  return (
    <section className="py-16 sm:py-24 bg-brand-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* 메인 메시지 */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            혼자 고민하지 마세요
          </h2>
          <p className="text-lg text-white/80 mb-8">
            이혼 전문가가 여러분의 새로운 시작을 함께 준비해드립니다.
            <br className="hidden sm:block" />
            지금 바로 무료 상담을 신청하세요.
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/consultation">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white text-brand-primary hover:bg-gray-100"
              >
                무료 상담 신청하기
              </Button>
            </Link>
            <Link href="/diagnosis">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto border-white text-white hover:bg-white/10"
              >
                이혼 유형 진단하기
              </Button>
            </Link>
          </div>

          {/* 부가 정보 */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>1588-0000</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>평일 09:00 - 18:00</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>help@ihonguide.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
