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
        // 게시물과 카테고리를 병렬로 가져오기
        const [postResponse, categoriesResponse] = await Promise.all([
          fetch(`/api/admin/blog/${postId}`, { credentials: 'include' }),
          fetch('/api/admin/categories', { credentials: 'include' }),
        ]);

        if (!postResponse.ok) {
          const errData = await postResponse.json().catch(() => null);
          setError(errData?.error || `API 오류 (${postResponse.status})`);
          return;
        }

        const postResult = await postResponse.json();
        const categoriesResult = await categoriesResponse.json();

        if (!postResult.data) {
          setError('게시물 데이터가 없습니다.');
          return;
        }

        const postData = postResult.data;
        setPost({
          id: postData.id,
          title: postData.title,
          slug: postData.slug,
          content: postData.content || '',
          excerpt: postData.excerpt || '',
          categoryId: postData.category?.id || '',
          metaTitle: postData.metaTitle || '',
          metaDescription: postData.metaDescription || '',
          status: postData.status,
        });

        setCategories(categoriesResult.data || []);
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
