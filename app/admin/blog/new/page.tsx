'use client';

/**
 * 새 블로그 글 작성 페이지
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BlogEditor } from '@/components/admin';

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

export default function NewBlogPostPage() {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: API에서 카테고리 불러오기
    const mockCategories: BlogCategory[] = [
      { id: '1', name: '절차', slug: 'procedure' },
      { id: '2', name: '양육권', slug: 'custody' },
      { id: '3', name: '재산분할', slug: 'property' },
      { id: '4', name: '위자료', slug: 'alimony' },
      { id: '5', name: '기타', slug: 'etc' },
    ];
    setCategories(mockCategories);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin" />
        <p className="mt-4 text-gray-600">불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/blog"
          className="text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">새 글 작성</h1>
          <p className="mt-1 text-gray-600">새로운 블로그 게시물을 작성합니다.</p>
        </div>
      </div>

      {/* 에디터 */}
      <BlogEditor categories={categories} />
    </div>
  );
}
