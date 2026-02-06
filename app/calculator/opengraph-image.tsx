import { createOgImage, OG_SIZE } from '@/lib/og';

export const runtime = 'edge';
export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = '양육비 무료 계산기 - 정확한 금액 산정';

export default function Image() {
  return createOgImage(
    '양육비 무료 계산기',
    '법원 양육비 산정기준표 기반 · 정확한 금액 산정',
    { badge: 'CALCULATOR' },
  );
}
