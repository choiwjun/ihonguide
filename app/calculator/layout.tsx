/**
 * 양육비 계산기 페이지 레이아웃
 */

import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';
import { PAGE_KEYWORDS } from '@/lib/seo-keywords';

export const metadata: Metadata = generateMetadata({
  title: '양육비 무료 계산기 - 정확한 금액 산정 & 양육권 기준',
  description: '부모 소득, 자녀 수, 연령을 고려하여 양육비를 정확하게 계산하세요. 법원 양육비 산정기준을 기반으로 한 정확한 계산 결과를 제공합니다. 친권, 양육권 분쟁까지 한 곳에서 해결하세요.',
  keywords: [...PAGE_KEYWORDS.calculator],
  ogImage: '/images/og-calculator.png',
});

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
