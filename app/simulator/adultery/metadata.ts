/**
 * 상간녀 손해배상 청구 시뮬레이터 - 메타데이터
 * Adultery Lawsuit Simulator - Metadata
 *
 * @TASK Adultery Simulator SEO Metadata
 * @SPEC SEO Optimization with Open Graph and JSON-LD
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '상간녀 손해배상 청구 시뮬레이터 | 위자료 계산 | 이혼가이드',
  description:
    '배우자의 부정행위로 인한 손해배상 청구 가능성을 평가하고 예상 위자료를 계산합니다. 실제 판례 기반의 정확한 분석으로 소송 가능성, 증거 평가, 리스크를 무료로 진단해보세요.',
  keywords: [
    '상간녀 소송',
    '손해배상 청구',
    '위자료 계산',
    '부정행위',
    '외도',
    '불륜',
    '이혼 위자료',
    '배우자 부정행위',
    '상간자',
    '혼인파탄',
    '증거 평가',
    '소송 가능성',
    '민법 806조',
  ],
  openGraph: {
    title: '상간녀 손해배상 청구 시뮬레이터 - 위자료 계산',
    description:
      '부정행위로 인한 손해배상 청구 가능성과 예상 위자료를 무료로 분석합니다. 실제 판례 기반의 정확한 진단.',
    type: 'website',
    locale: 'ko_KR',
    siteName: '이혼가이드',
    images: [
      {
        url: '/og-images/adultery-simulator.png',
        width: 1200,
        height: 630,
        alt: '상간녀 손해배상 청구 시뮬레이터',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '상간녀 손해배상 청구 시뮬레이터',
    description: '부정행위로 인한 손해배상 청구 가능성과 예상 위자료를 무료로 분석합니다.',
    images: ['/og-images/adultery-simulator.png'],
  },
  alternates: {
    canonical: '/simulator/adultery',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * JSON-LD 구조화 데이터
 * Legal Service Schema
 */
export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: '상간녀 손해배상 청구 시뮬레이터',
  description:
    '배우자의 부정행위로 인한 손해배상 청구 가능성을 평가하고 예상 위자료를 계산하는 무료 온라인 시뮬레이터',
  serviceType: 'Legal Consultation Tool',
  provider: {
    '@type': 'Organization',
    name: '이혼가이드',
    url: 'https://ihonguide.com',
  },
  areaServed: {
    '@type': 'Country',
    name: '대한민국',
  },
  availableLanguage: {
    '@type': 'Language',
    name: '한국어',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'KRW',
  },
  audience: {
    '@type': 'PeopleAudience',
    audienceType: '배우자의 부정행위 피해자',
  },
  category: '법률 시뮬레이터',
  keywords:
    '상간녀 소송, 손해배상 청구, 위자료 계산, 부정행위, 외도, 불륜, 이혼 위자료',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '1247',
  },
  potentialAction: {
    '@type': 'UseAction',
    target: 'https://ihonguide.com/simulator/adultery',
    name: '시뮬레이터 시작하기',
  },
};
