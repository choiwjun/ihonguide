/**
 * 랜딩 페이지
 * Light Transparency Variant 3
 */

import {
  HeroSection,
  StatsSection,
  FeaturesSection,
  CTASection,
} from '@/components/landing';

export default function Home() {
  return (
    <main>
      <HeroSection />
      {/* StatsSection 임시 주석 처리 */}
      {/* <StatsSection /> */}
      <FeaturesSection />
      <CTASection />
    </main>
  );
}
