'use client';

/**
 * 블로그 상세 페이지
 */

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout';
import { BlogDetail } from '@/components/blog';
import type { BlogPost, BlogPostSummary } from '@/types/blog';

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/blog/${slug}`);
        const data = await response.json();

        if (response.status === 404) {
          setError('not_found');
          return;
        }

        if (!response.ok) {
          throw new Error(data.error || '게시물을 불러오는데 실패했습니다.');
        }

        setPost(data.data.post);
        setRelatedPosts(data.data.relatedPosts);
      } catch (err) {
        setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  // 로딩 상태
  if (isLoading) {
    return (
      <Container size="md" className="py-8">
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin" />
          <p className="mt-4 text-gray-600">불러오는 중...</p>
        </div>
      </Container>
    );
  }

  // 404 처리
  if (error === 'not_found') {
    notFound();
  }

  // 에러 상태
  if (error || !post) {
    return (
      <Container size="md" className="py-8">
        <div className="p-8 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
          <h1 className="text-xl font-semibold mb-2">오류가 발생했습니다</h1>
          <p>{error || '게시물을 불러올 수 없습니다.'}</p>
        </div>
      </Container>
    );
  }

  return (
    <Container size="md" className="py-8">
      <BlogDetail post={post} relatedPosts={relatedPosts} />
    </Container>
  );
}
