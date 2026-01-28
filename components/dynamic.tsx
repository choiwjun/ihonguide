/**
 * 동적 임포트 컴포넌트
 * 코드 스플리팅을 통한 초기 번들 크기 감소
 */

import dynamic from 'next/dynamic';

// 블로그 에디터 - 관리자만 사용
export const DynamicBlogEditor = dynamic(
  () => import('@/components/admin/BlogEditor').then((mod) => mod.BlogEditor),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-200 h-96 rounded-lg" />
    ),
    ssr: false,
  }
);

// 차트 컴포넌트 (향후 추가 시)
// export const DynamicChart = dynamic(
//   () => import('@/components/charts/Chart'),
//   { ssr: false }
// );
