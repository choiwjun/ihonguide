/**
 * 랜딩 페이지
 * Light Transparency Variant 3
 */

import { Metadata } from 'next';
import {
  HeroSection,
  StatsSection,
  FeaturesSection,
  CTASection,
  AeoSummarySection,
} from '@/components/landing';
import { generateMetadata } from '@/lib/metadata';
import { PAGE_KEYWORDS } from '@/lib/seo-keywords';

export const metadata: Metadata = generateMetadata({
  title: '이혼 준비 플랫폼 - 무료 진단, 계산기, 상담',
  description: '이혼 준비부터 진단, 양육비 계산, 재산분할까지. 이혼 절차, 준비 방법, 비용을 한 곳에서 확인하세요. 전문 변호사가 감수한 정보로 현명한 이혼을 준비할 수 있습니다.',
  keywords: [...PAGE_KEYWORDS.home],
  ogImage: '/images/og-home.png',
});

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AeoSummarySection />
      {/* StatsSection 임시 주석 처리 */}
      {/* <StatsSection /> */}
      <FeaturesSection />
      <CTASection />
    </main>
  );
}
