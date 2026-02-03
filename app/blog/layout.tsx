/**
 * 블로그 목록 페이지 레이아웃
 */

import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';
import { PAGE_KEYWORDS } from '@/lib/seo-keywords';

export const metadata: Metadata = generateMetadata({
  title: '이혼 정보 블로그 - 절차, 비용, 양육권, 재산분할 가이드',
  description: '이혼 절차, 비용, 양육권, 재산분할 등 이혼 관련 전반적인 정보를 제공하는 블로그. 실제 팁과 전문가 조언으로 이혼 준비를 도와드립니다.',
  keywords: PAGE_KEYWORDS.blog,
  ogImage: '/images/og-blog.png',
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
