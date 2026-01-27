import type { Metadata } from 'next';
import { Providers } from './providers';
import { Header, Footer } from '@/components/layout';
import './globals.css';

export const metadata: Metadata = {
  title: '이혼준비 - ihonguide',
  description: '이혼을 고민하거나 준비하는 사람들에게 체계적인 정보와 도구를 제공하는 플랫폼',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FDFBF7]">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
