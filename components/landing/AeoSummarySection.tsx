/**
 * AEO용 요약 섹션 (메인 페이지)
 * AI 답변 엔진이 "이혼 준비란?" 등 질문에 인용하기 쉬운 50단어 내외 요약
 */

import Link from 'next/link';
import { SHORT_SUMMARIES } from '@/lib/aeo-data';

export function AeoSummarySection() {
  return (
    <section
      className="w-full border-y border-stone-200/60 bg-white/40 backdrop-blur-sm py-8 px-6"
      aria-labelledby="aeo-summary-heading"
    >
      <div className="container mx-auto max-w-[800px]">
        <h2 id="aeo-summary-heading" className="text-xl font-semibold text-slate-800 mb-3">
          이혼 준비란?
        </h2>
        <p className="text-slate-600 leading-relaxed" data-aeo-summary>
          {SHORT_SUMMARIES.divorcePreparation}
        </p>
        <p className="text-slate-600 leading-relaxed mt-3" data-aeo-summary>
          {SHORT_SUMMARIES.agreedDivorce}
        </p>
        <Link
          href="/guide"
          className="inline-block mt-4 text-sm font-medium text-[#0f766e] hover:underline"
        >
          이혼 준비 절차 자세히 보기 →
        </Link>
      </div>
    </section>
  );
}
