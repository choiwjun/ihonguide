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
      // TODO: API에서 데이터 불러오기
      // 현재는 더미 데이터
      const mockData: BlogPostAdmin[] = [
        {
          id: '1',
          slug: 'divorce-procedure-guide',
          title: '이혼 절차 완벽 가이드 2026',
          category: { name: '절차' },
          status: 'published',
          viewCount: 1234,
          publishedAt: '2026-01-15T00:00:00Z',
          createdAt: '2026-01-10T00:00:00Z',
        },
        {
          id: '2',
          slug: 'child-support-calculation',
          title: '양육비 계산 방법과 기준',
          category: { name: '양육권' },
          status: 'published',
          viewCount: 856,
          publishedAt: '2026-01-20T00:00:00Z',
          createdAt: '2026-01-18T00:00:00Z',
        },
        {
          id: '3',
          slug: 'property-division-tips',
          title: '재산분할 시 알아야 할 5가지',
          category: { name: '재산분할' },
          status: 'draft',
          viewCount: 0,
          publishedAt: null,
          createdAt: '2026-01-25T00:00:00Z',
        },
      ];

      const filtered = filter === 'all'
        ? mockData
        : mockData.filter((p) => p.status === filter);

      setPosts(filtered);
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    // TODO: API 호출로 삭제
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    // TODO: API 호출로 상태 업데이트
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: newStatus as 'draft' | 'published',
              publishedAt: newStatus === 'published' ? new Date().toISOString() : null,
            }
          : p
      )
    );
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
