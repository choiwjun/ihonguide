import type { Metadata, Viewport } from 'next';
import { Providers } from './providers';
import { Header, Footer } from '@/components/layout';
import { notoSerifKr, PRETENDARD_CSS_URL } from '@/lib/fonts';
import { defaultMetadata } from '@/lib/metadata';
import './globals.css';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: '아이혼가이드 - 이혼 준비의 시작',
  description: '이혼을 고민하거나 준비하는 사람들에게 체계적인 정보와 도구를 제공하는 플랫폼',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1B4D3E',
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
      <body className="min-h-screen flex flex-col bg-[#FDFBF7] font-sans antialiased">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
