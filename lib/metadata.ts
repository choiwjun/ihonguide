/**
 * SEO 메타데이터 유틸리티
 */

import { Metadata } from 'next';

const SITE_NAME = '이혼준비';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ihonjunbi.com';
const DEFAULT_DESCRIPTION = '이혼 준비부터 진단, 양육비 계산, 재산분할까지. 이혼 절차, 준비 방법, 비용을 한 곳에서 확인하세요. 전문 변호사가 감수한 정보로 현명한 이혼을 준비할 수 있습니다.';

interface GenerateMetadataOptions {
  title: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
  canonical?: string;
}

/**
 * 페이지 메타데이터 생성 헬퍼
 */
export function generateMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = [],
  ogImage = '/images/og-default.png',
  noIndex = false,
  canonical,
}: GenerateMetadataOptions): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const defaultKeywords = [
    '이혼준비',
    '이혼 준비',
    '이혼 절차',
    '이혼 방법',
    '양육비',
    '양육비 계산기',
    '재산분할',
    '위자료',
    '협의이혼',
    '재판이혼',
    '이혼상담',
    '이혼 고민',
    '법률상담',
  ];

  return {
    title: fullTitle,
    description,
    keywords: [...defaultKeywords, ...keywords],
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonical || undefined,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: SITE_URL,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'ko_KR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

/**
 * 블로그 포스트용 메타데이터 생성
 */
export function generateBlogMetadata({
  title,
  description,
  slug,
  category,
  publishedAt,
  ogImage,
}: {
  title: string;
  description: string;
  slug: string;
  category?: string;
  publishedAt?: string;
  ogImage?: string;
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME} 블로그`;
  const url = `${SITE_URL}/blog/${slug}`;
  const keywords = category ? [category, '이혼 정보', '법률 상식'] : ['이혼 정보', '법률 상식'];

  return {
    title: fullTitle,
    description,
    keywords,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: title }]
        : undefined,
      locale: 'ko_KR',
      type: 'article',
      publishedTime: publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

/**
 * 기본 사이트 메타데이터
 */
export const defaultMetadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    '이혼준비',
    '이혼 준비',
    '이혼 절차',
    '이혼 방법',
    '이혼 과정',
    '이혼 준비 방법',
    '이혼준비 체크리스트',
    '이혼 고민',
    '이혼 상담',
    '양육비',
    '양육비 계산기',
    '양육권',
    '재산분할',
    '위자료',
    '협의이혼',
    '재판이혼',
    '이혼 소송',
    '이혼상담',
    '법률상담',
    '이혼 무료 상담',
  ],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    other: {
      'naver-site-verification': process.env.NEXT_PUBLIC_NAVER_VERIFICATION || '',
    },
  },
};
