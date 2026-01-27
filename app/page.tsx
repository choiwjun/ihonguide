/**
 * 랜딩 페이지
 */

import {
  HeroSection,
  ProblemSolutionSection,
  FeaturesSection,
  TrustSection,
  CTASection,
} from '@/components/landing';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProblemSolutionSection />
      <FeaturesSection />
      <TrustSection />
      <CTASection />
    </main>
  );
}
