import { createOgImage, OG_SIZE } from '@/lib/og';

export const runtime = 'edge';
export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = '이혼준비 - 이혼 절차, 양육비, 재산분할 정보 플랫폼';

export default function Image() {
  return createOgImage(
    '이혼준비',
    '이혼 절차 · 양육비 계산 · 재산분할 · 전문 상담',
  );
}
