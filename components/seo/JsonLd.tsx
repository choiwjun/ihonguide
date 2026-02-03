/**
 * 구조적 데이터 (JSON-LD) 컴포넌트
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ihonjunbi.com';

interface JsonLdProps {
  data: object;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * 조직 정보 생성
 */
export function createOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '이혼준비',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: '이혼 준비부터 양육비 계산까지, 법률 전문가가 함께하는 이혼 가이드',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+82-XXX-XXXX',
      contactType: 'customer service',
    },
    sameAs: [
      'https://www.facebook.com/ihonjunbi',
      'https://www.instagram.com/ihonjunbi',
      'https://www.youtube.com/@ihonjunbi',
    ],
  };
}

/**
 * 웹사이트 정보 생성
 */
export function createWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '이혼준비',
    url: SITE_URL,
    description: '이혼 준비부터 양육비 계산까지, 법률 전문가가 함께하는 이혼 가이드',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': {
        '@type': 'PropertyValueSpecification',
        valueRequired: true,
        valueName: 'search_term_string',
      },
    },
  };
}

/**
 * FAQ 페이지 구조적 데이터
 */
export function createFAQJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * 블로그 포스트 구조적 데이터
 */
export function createArticleJsonLd({
  title,
  description,
  url,
  publishedAt,
  author,
  imageUrl,
}: {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  author?: string;
  imageUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished: publishedAt,
    author: {
      '@type': 'Organization',
      name: author || '이혼준비',
    },
    ...(imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: imageUrl,
        height: 630,
        width: 1200,
      },
    }),
  };
}

/**
 * HowTo 구조적 데이터 (AEO: 절차·단계 답변용)
 */
export function createHowToJsonLd({
  name,
  description,
  step,
  url,
}: {
  name: string;
  description: string;
  step: Array<{ name: string; text: string }>;
  url?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: step.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
    ...(url && { url }),
  };
}

/**
 * 정의(Definition) 구조적 데이터 (AEO: 용어 정의 인용용)
 */
export function createDefinitionJsonLd(
  term: string,
  definition: string,
  url?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term,
    description: definition,
    ...(url && { url }),
  };
}
