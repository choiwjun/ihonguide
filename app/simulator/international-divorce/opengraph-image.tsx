import { createOgImage, OG_SIZE } from '@/lib/og';

export const runtime = 'edge';
export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = '국제이혼 시뮬레이터 - 준거법, 관할, 비용 예측';

export default function Image() {
  return createOgImage(
    '국제이혼 시뮬레이터',
    '준거법 · 관할 법원 · 예상 비용과 절차를 한눈에 확인',
    { badge: 'SIMULATOR' },
  );
}
