'use client';

/**
 * 블로그 글 수정 페이지
 */

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { BlogEditor } from '@/components/admin';

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  categoryId: string;
  metaTitle: string;
  metaDescription: string;
  status: 'draft' | 'published';
}

export default function EditBlogPostPage() {
  const params = useParams();
  const postId = params.id as string;

  const [post, setPost] = useState<BlogPostData | null>(null);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // TODO: API에서 카테고리와 게시물 데이터 불러오기
        const mockCategories: BlogCategory[] = [
          { id: '1', name: '절차', slug: 'procedure' },
          { id: '2', name: '양육권', slug: 'custody' },
          { id: '3', name: '재산분할', slug: 'property' },
          { id: '4', name: '위자료', slug: 'alimony' },
          { id: '5', name: '기타', slug: 'etc' },
        ];

        // 더미 게시물 데이터
        const mockPosts: Record<string, BlogPostData> = {
          '1': {
            id: '1',
            title: '이혼 절차 완벽 가이드 2026',
            slug: 'divorce-procedure-guide',
            content: '# 이혼 절차 안내\n\n이혼은 크게 협의이혼과 재판상 이혼으로 나뉩니다...',
            excerpt: '이혼 절차의 모든 것을 알려드립니다.',
            categoryId: '1',
            metaTitle: '이혼 절차 완벽 가이드 2026 | 아이혼가이드',
            metaDescription: '협의이혼과 재판상 이혼의 차이점, 필요 서류, 소요 기간 등 이혼 절차의 모든 것을 상세히 안내합니다.',
            status: 'published',
          },
          '2': {
            id: '2',
            title: '양육비 계산 방법과 기준',
            slug: 'child-support-calculation',
            content: '# 양육비 계산\n\n양육비는 부모의 소득과 자녀의 나이에 따라 결정됩니다...',
            excerpt: '양육비 계산 방법을 알려드립니다.',
            categoryId: '2',
            metaTitle: '양육비 계산 방법과 기준 | 아이혼가이드',
            metaDescription: '대한민국 법원의 양육비 산정 기준표를 바탕으로 양육비 계산 방법을 상세히 안내합니다.',
            status: 'published',
          },
          '3': {
            id: '3',
            title: '재산분할 시 알아야 할 5가지',
            slug: 'property-division-tips',
            content: '# 재산분할 가이드\n\n재산분할 시 알아야 할 중요한 사항들...',
            excerpt: '재산분할에 대한 핵심 정보를 알려드립니다.',
            categoryId: '3',
            metaTitle: '재산분할 시 알아야 할 5가지 | 아이혼가이드',
            metaDescription: '이혼 시 재산분할에서 꼭 알아야 할 5가지 핵심 사항을 정리했습니다.',
            status: 'draft',
          },
        };

        const postData = mockPosts[postId];
        if (!postData) {
          setError('게시물을 찾을 수 없습니다.');
          return;
        }

        setCategories(mockCategories);
        setPost(postData);
      } catch {
        setError('데이터를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin" />
        <p className="mt-4 text-gray-600">불러오는 중...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error || '게시물을 찾을 수 없습니다.'}</p>
        <Link href="/admin/blog" className="mt-4 inline-block text-brand-primary hover:underline">
          목록으로 돌아가기
        </Link>
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
          <h1 className="text-2xl font-bold text-gray-900">글 수정</h1>
          <p className="mt-1 text-gray-600">블로그 게시물을 수정합니다.</p>
        </div>
      </div>

      {/* 에디터 */}
      <BlogEditor post={post} categories={categories} isEdit />
    </div>
  );
}
