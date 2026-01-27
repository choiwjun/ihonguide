'use client';

/**
 * 블로그 목록 컴포넌트
 */

import { useState, useEffect, useCallback } from 'react';
import { BlogCard } from './BlogCard';
import { Button } from '@/components/ui';
import { BLOG_CATEGORIES } from '@/types/blog';
import type { BlogPostSummary, BlogListResponse } from '@/types/blog';

interface BlogListProps {
  initialData?: BlogListResponse;
}

export function BlogList({ initialData }: BlogListProps) {
  const [posts, setPosts] = useState<BlogPostSummary[]>(initialData?.posts || []);
  const [page, setPage] = useState(initialData?.page || 1);
  const [totalPages, setTotalPages] = useState(initialData?.totalPages || 1);
  const [category, setCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 블로그 목록 불러오기
  const fetchPosts = useCallback(async (pageNum: number, categorySlug: string | null) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.set('page', pageNum.toString());
      if (categorySlug) {
        params.set('category', categorySlug);
      }

      const response = await fetch(`/api/blog?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '블로그 목록을 불러오는데 실패했습니다.');
      }

      setPosts(data.data.posts);
      setPage(data.data.page);
      setTotalPages(data.data.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 카테고리 변경 시
  const handleCategoryChange = useCallback((slug: string | null) => {
    setCategory(slug);
    fetchPosts(1, slug);
  }, [fetchPosts]);

  // 페이지 변경 시
  const handlePageChange = useCallback((newPage: number) => {
    fetchPosts(newPage, category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [fetchPosts, category]);

  // 초기 데이터가 없으면 불러오기
  useEffect(() => {
    if (!initialData) {
      fetchPosts(1, null);
    }
  }, [initialData, fetchPosts]);

  return (
    <div className="space-y-8">
      {/* 카테고리 탭 */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={category === null ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => handleCategoryChange(null)}
        >
          전체
        </Button>
        {BLOG_CATEGORIES.map((cat) => (
          <Button
            key={cat.slug}
            variant={category === cat.slug ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => handleCategoryChange(cat.slug)}
          >
            {cat.name}
          </Button>
        ))}
      </div>

      {/* 로딩 상태 */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin" />
          <p className="mt-4 text-gray-600">불러오는 중...</p>
        </div>
      )}

      {/* 에러 상태 */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
          {error}
        </div>
      )}

      {/* 게시물 목록 */}
      {!isLoading && !error && (
        <>
          {posts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              게시물이 없습니다.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
              >
                이전
              </Button>
              <span className="flex items-center px-4 text-sm text-gray-600">
                {page} / {totalPages}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
              >
                다음
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
