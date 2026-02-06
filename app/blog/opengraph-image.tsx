import { createOgImage, OG_SIZE } from '@/lib/og';

export const runtime = 'edge';
export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = '이혼 정보 블로그 - 절차, 비용, 양육권, 재산분할 가이드';

export default function Image() {
  return createOgImage(
    '이혼 정보 블로그',
    '이혼 절차, 비용, 양육권, 재산분할 등 전문 정보를 제공합니다',
    { badge: 'BLOG' },
  );
}
