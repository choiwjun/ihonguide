'use client';

/**
 * 블로그 관리 페이지
 */

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Card, Button } from '@/components/ui';

interface BlogPostAdmin {
  id: string;
  slug: string;
  title: string;
  category?: { name: string };
  status: 'draft' | 'published';
  viewCount: number;
  publishedAt: string | null;
  createdAt: string;
}

type StatusFilter = 'all' | 'draft' | 'published';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPostAdmin[]>([]);
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter !== 'all') {
        params.set('status', filter);
      }

      const response = await fetch(`/api/admin/blog?${params.toString()}`);
      const result = await response.json();

      if (result.error) {
        console.error('Failed to fetch posts:', result.error);
        setPosts([]);
        return;
      }

      setPosts(result.data?.posts || []);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();

      if (result.error) {
        alert(result.error);
        return;
      }

      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';

    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const result = await response.json();

      if (result.error) {
        alert(result.error);
        return;
      }

      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                status: newStatus as 'draft' | 'published',
                publishedAt: newStatus === 'published' ? new Date().toISOString() : p.publishedAt,
              }
            : p
        )
      );
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('상태 변경에 실패했습니다.');
    }
  };

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">블로그 관리</h1>
          <p className="mt-1 text-gray-600">블로그 게시물을 관리합니다.</p>
        </div>
        <Link href="/admin/blog/new">
          <Button>
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            새 글 작성
          </Button>
        </Link>
      </div>

      {/* 필터 */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === 'all' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          전체
        </Button>
        <Button
          variant={filter === 'published' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setFilter('published')}
        >
          발행됨
        </Button>
        <Button
          variant={filter === 'draft' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setFilter('draft')}
        >
          초안
        </Button>
      </div>

      {/* 게시물 목록 */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin" />
          <p className="mt-4 text-gray-600">불러오는 중...</p>
        </div>
      ) : posts.length === 0 ? (
        <Card>
          <div className="text-center py-8 text-gray-500">
            게시물이 없습니다.
          </div>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">제목</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">카테고리</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">상태</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">조회수</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">작성일</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">관리</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="text-brand-primary hover:underline line-clamp-1"
                      >
                        {post.title}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {post.category?.name || '-'}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleStatusToggle(post.id, post.status)}
                        className={`px-2 py-0.5 text-xs rounded cursor-pointer ${
                          post.status === 'published'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {post.status === 'published' ? '발행됨' : '초안'}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {post.viewCount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Link href={`/admin/blog/${post.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            수정
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(post.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          삭제
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
