import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이혼준비 - ihonguide',
  description: '이혼을 고민하거나 준비하는 사람들에게 체계적인 정보와 도구를 제공하는 플랫폼',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
