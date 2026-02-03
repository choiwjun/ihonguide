import type { Metadata, Viewport } from 'next';
import { Providers } from './providers';
import { Header, Footer } from '@/components/layout';
import { SkipLink } from '@/components/a11y';
import {
  JsonLd,
  createOrganizationJsonLd,
  createWebSiteJsonLd,
  createFAQJsonLd,
  createHowToJsonLd,
  createDefinitionJsonLd,
} from '@/components/seo/JsonLd';
import { notoSerifKr, PRETENDARD_CSS_URL } from '@/lib/fonts';
import { defaultMetadata } from '@/lib/metadata';
import { FAQ_ITEMS, HOWTO_DIVORCE_PREPARATION, DEFINITIONS } from '@/lib/aeo-data';
import './globals.css';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: '이혼준비 - 이혼 절차, 양육비, 재산분할 정보',
  description: '이혼을 고민하거나 준비하는 사람들에게 체계적인 정보와 도구를 제공하는 플랫폼',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0f766e',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={notoSerifKr.variable}>
      <head>
        {/* Pretendard 폰트 - preload로 성능 최적화 */}
        <link
          rel="preload"
          href={PRETENDARD_CSS_URL}
          as="style"
        />
        <link
          rel="stylesheet"
          href={PRETENDARD_CSS_URL}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F9F8F6] font-sans antialiased">
        <SkipLink />
        {/* 구조적 데이터 */}
        <JsonLd data={createOrganizationJsonLd()} />
        <JsonLd data={createWebSiteJsonLd()} />
        
        {/* AEO: FAQ 구조적 데이터 */}
        <JsonLd
          data={createFAQJsonLd(
            FAQ_ITEMS.map((item) => ({
              question: item.question,
              answer: item.answer,
            }))
          )}
        />
        {/* AEO: 이혼 준비 절차 (HowTo) */}
        <JsonLd
          data={createHowToJsonLd({
            name: HOWTO_DIVORCE_PREPARATION.name,
            description: HOWTO_DIVORCE_PREPARATION.description,
            step: HOWTO_DIVORCE_PREPARATION.step,
            url: HOWTO_DIVORCE_PREPARATION.url,
          })}
        />
        {/* AEO: 용어 정의 (DefinedTerm) */}
        {DEFINITIONS.map((item) => (
          <JsonLd
            key={item.term}
            data={createDefinitionJsonLd(item.term, item.definition)}
          />
        ))}
        
        <Providers>
          <Header />
          <main id="main-content" className="flex-1" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
