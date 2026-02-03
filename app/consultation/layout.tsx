/**
 * 상담 신청 페이지 레이아웃
 */

import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';
import { PAGE_KEYWORDS } from '@/lib/seo-keywords';

export const metadata: Metadata = generateMetadata({
  title: '이혼 전문 상담 신청 - 무료 법률 상담 24시간',
  description: '이혼 고민이 있다면 무료 법률 상담을 신청하세요. 전문 변호사가 이혼 절차, 양육권, 재산분할 등 모든 분야에서 상황에 맞는 맞춤형 상담을 제공합니다. 신청 후 24시간 내 연락드립니다.',
  keywords: PAGE_KEYWORDS.consultation,
  ogImage: '/images/og-consultation.png',
});

export default function ConsultationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
