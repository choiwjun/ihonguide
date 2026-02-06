import { createOgImage, OG_SIZE } from '@/lib/og';

export const runtime = 'edge';
export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = '상간녀 손해배상 청구 시뮬레이터 - 위자료 계산';

export default function Image() {
  return createOgImage(
    '상간녀 손해배상 청구 시뮬레이터',
    '판례 기반 소송 가능성 분석 · 예상 위자료 계산',
    { badge: 'SIMULATOR' },
  );
}
