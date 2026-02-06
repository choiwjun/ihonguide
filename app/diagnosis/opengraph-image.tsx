import { createOgImage, OG_SIZE } from '@/lib/og';

export const runtime = 'edge';
export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = '이혼 유형 무료 진단 - 협의이혼, 조정이혼, 소송이혼';

export default function Image() {
  return createOgImage(
    '이혼 유형 무료 진단',
    '10문항으로 나에게 맞는 이혼 유형을 무료로 확인하세요',
    { badge: 'DIAGNOSIS' },
  );
}
