/**
 * 재산분할 계산기 페이지
 * (준비 중 안내 + 재산분할 상담 연결)
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout';
import { Card } from '@/components/ui';
import { generateMetadata } from '@/lib/metadata';
import { ASSET_COST_KEYWORDS } from '@/lib/seo-keywords';

export const metadata: Metadata = generateMetadata({
  title: '재산분할 계산기 - 예상 비율·금액 참고',
  description: '이혼 시 재산분할 비율과 절차를 안내합니다. 공동재산·특별재산 구분, 기여도 반영 등 재산분할 계산에 필요한 정보를 확인하고 전문가 상담을 신청하세요.',
  keywords: [
    ...ASSET_COST_KEYWORDS,
    '재산분할 계산',
    '재산분할 비율',
    '공동재산',
    '특별재산',
  ],
  ogImage: '/images/og-calculator.png',
});

export default function PropertyCalculatorPage() {
  return (
    <Container size="md" className="py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          재산분할 계산기
        </h1>
        <p className="text-gray-600">
          재산분할 비율·금액 참고와 전문 상담을 안내합니다.
        </p>
      </div>

      <Card className="p-8 mb-8">
        <div className="flex flex-col items-center text-center max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            재산분할 계산기는 준비 중입니다
          </h2>
          <p className="text-gray-600 mb-6">
            재산분할은 부동산·예금·보험 등 재산 유형과 기여도에 따라 산정 방식이 달라져,
            정확한 계산을 위해 전문가 상담이 필요합니다. 무료 상담으로 예상 비율과 절차를 안내받으세요.
          </p>
          <Link
            href="/consultation"
            className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors"
          >
            재산분할 상담 신청하기
          </Link>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/calculator">
          <Card className="p-6 hover:shadow-md transition-shadow border-teal-100">
            <h3 className="font-semibold text-gray-900 mb-2">양육비 계산기</h3>
            <p className="text-sm text-gray-600">
              법원 기준으로 예상 양육비를 바로 계산해보세요.
            </p>
          </Card>
        </Link>
        <Link href="/guide">
          <Card className="p-6 hover:shadow-md transition-shadow border-teal-100">
            <h3 className="font-semibold text-gray-900 mb-2">재산분할 가이드</h3>
            <p className="text-sm text-gray-600">
              공동재산·특별재산, 분할 비율 등 기본 개념을 확인하세요.
            </p>
          </Card>
        </Link>
      </div>
    </Container>
  );
}
