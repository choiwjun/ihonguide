/**
 * 국제이혼 시뮬레이터 레이아웃
 * SEO 메타데이터 및 JSON-LD 구조화 데이터
 */

import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ihonjunbi.com';

export const metadata: Metadata = generateMetadata({
  title: '국제이혼 시뮬레이터 - 준거법, 관할, 비용 예측',
  description:
    '외국인 배우자와의 이혼 준비, 어느 나라 법이 적용될까요? 국제이혼 시뮬레이터로 준거법, 관할 법원, 예상 비용과 절차를 미리 확인하세요. 국제사법 전문가가 검증한 정보를 제공합니다.',
  keywords: [
    '국제이혼',
    '국제이혼 준비',
    '국제이혼 절차',
    '국제이혼 비용',
    '외국인 배우자 이혼',
    '국제결혼 이혼',
    '국제사법',
    '준거법',
    '국제재판관할',
    '헤이그 협약',
    '아포스티유',
    '국제이혼 시뮬레이터',
    '국제이혼 계산기',
    '외국 판결 승인',
    '국제이혼 변호사',
  ],
  ogImage: '/images/og-international-divorce-simulator.png',
  canonical: `${SITE_URL}/simulator/international-divorce`,
});

export default function InternationalDivorceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // JSON-LD 구조화 데이터
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '국제이혼 시뮬레이터',
    description:
      '외국인 배우자와의 이혼 시 적용되는 법률, 관할 법원, 예상 비용과 절차를 시뮬레이션하는 온라인 도구',
    url: `${SITE_URL}/simulator/international-divorce`,
    applicationCategory: 'LegalService',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    provider: {
      '@type': 'LegalService',
      name: '이혼준비',
      url: SITE_URL,
      serviceType: '국제이혼 법률 정보 제공',
      areaServed: {
        '@type': 'Country',
        name: 'South Korea',
      },
      availableLanguage: ['ko', 'en'],
    },
    featureList: [
      '준거법 결정',
      '관할 법원 확인',
      '예상 비용 계산',
      '필수 서류 안내',
      '절차 단계별 가이드',
    ],
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
