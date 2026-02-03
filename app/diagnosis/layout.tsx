/**
 * 이혼 진단 페이지 레이아웃
 */

import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';
import { PAGE_KEYWORDS } from '@/lib/seo-keywords';

export const metadata: Metadata = generateMetadata({
  title: '이혼 유형 무료 진단 - 협의이혼/조정이혼/소송이혼 가능 여부',
  description: '10문항의 간단한 진단으로 귀하의 이혼 유형을 파악하세요. 협의이혼, 조정이혼, 소송이혼 중 어디에 해당하는지 무료로 확인할 수 있습니다. 이혼 고민이 있다면 지금 바로 진단해보세요.',
  keywords: [...PAGE_KEYWORDS.diagnosis],
  ogImage: '/images/og-diagnosis.png',
});

export default function DiagnosisLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
