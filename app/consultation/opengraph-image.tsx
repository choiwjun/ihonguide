import { createOgImage, OG_SIZE } from '@/lib/og';

export const runtime = 'edge';
export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = '이혼 전문 상담 신청 - 무료 법률 상담';

export default function Image() {
  return createOgImage(
    '이혼 전문 상담 신청',
    '전문 변호사의 맞춤형 상담 · 신청 후 24시간 내 연락',
    { badge: 'CONSULTATION' },
  );
}
