'use client';

/**
 * 저장된 블로그 글 컴포넌트
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, Button } from '@/components/ui';

interface SavedPost {
  id: string;
  postId: string;
  post: {
    slug: string;
    title: string;
    excerpt?: string;
    category?: { name: string };
  };
  createdAt: string;
}

export function SavedPosts() {
  const [posts, setPosts] = useState<SavedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: API에서 저장된 글 불러오기
    // 현재는 로컬 스토리지에서 불러옴
    const savedPosts = localStorage.getItem('savedPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <Card>
        <div className="text-center py-8 text-gray-500">불러오는 중...</div>
      </Card>
    );
  }

  if (posts.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">아직 저장된 글이 없습니다.</p>
          <Link href="/blog">
            <Button variant="secondary" size="sm">
              블로그 둘러보기
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((saved) => (
        <Link key={saved.id} href={`/blog/${saved.post.slug}`}>
          <Card className="hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                {saved.post.category && (
                  <span className="inline-block px-2 py-0.5 text-xs font-medium text-brand-primary bg-brand-primary/10 rounded mb-2">
                    {saved.post.category.name}
                  </span>
                )}
                <h4 className="font-medium text-gray-900 line-clamp-1">
                  {saved.post.title}
                </h4>
                {saved.post.excerpt && (
                  <p className="text-sm text-gray-600 line-clamp-1 mt-1">
                    {saved.post.excerpt}
                  </p>
                )}
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0 ml-4">
                {new Date(saved.createdAt).toLocaleDateString('ko-KR')}
              </span>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
