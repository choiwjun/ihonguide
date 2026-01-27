/**
 * Next.js 폰트 최적화 설정
 * display: swap으로 FOUT(Flash of Unstyled Text) 방지
 */

import { Noto_Serif_KR } from 'next/font/google';

// Noto Serif KR - Google 폰트 (next/font로 최적화)
export const notoSerifKr = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-noto-serif',
  display: 'swap',
  preload: true,
});

// Pretendard CDN URL (preload용)
export const PRETENDARD_CSS_URL =
  'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css';

// 폰트 클래스 이름 export
export const fontVariables = notoSerifKr.variable;
