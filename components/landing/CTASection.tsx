'use client';

/**
 * CTA(Call-to-Action) 섹션 컴포넌트
 * Light Transparency Variant 3 (Ihon Guide Design System)
 */

import Link from 'next/link';
import { Button } from '@/components/ui';

export function CTASection() {
  return (
    <section className="w-full px-6 py-20 bg-gradient-to-t from-[#0f766e]/5 to-transparent">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Main Message */}
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
          준비된 데이터가
          <br />
          당신의 <span className="text-[#0f766e]">새로운 시작</span>을 돕습니다
        </h2>

        <p className="text-slate-500 text-lg">
          지금 바로 무료 진단을 통해 나의 이혼 소송 예상 결과를 확인해보세요.
          <br className="hidden sm:block" />
          회원가입 없이 3분이면 충분합니다.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center pt-4">
          <Link href="/diagnosis">
            <Button
              size="lg"
              className="px-10 py-4 rounded-xl text-lg shadow-[0_10px_30px_-5px_rgba(15,118,110,0.12)] hover:scale-105 transition-all duration-300"
            >
              무료 진단 시작하기
            </Button>
          </Link>
        </div>

        {/* Privacy Notice */}
        <p className="text-xs text-slate-400 mt-6">
          * 입력된 모든 정보는 암호화되어 안전하게 보호되며, 분석 목적으로만 일시 사용됩니다.
        </p>
      </div>
    </section>
  );
}
