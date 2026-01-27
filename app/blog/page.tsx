'use client';

/**
 * 블로그 목록 페이지
 */

import { Container } from '@/components/layout';
import { BlogList } from '@/components/blog';

export default function BlogPage() {
  return (
    <Container size="lg" className="py-8">
      {/* 페이지 헤더 */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          이혼 가이드 블로그
        </h1>
        <p className="mt-2 text-gray-600">
          이혼 준비에 필요한 정보와 노하우를 제공합니다.
        </p>
      </div>

      {/* 블로그 목록 */}
      <BlogList />
    </Container>
  );
}
