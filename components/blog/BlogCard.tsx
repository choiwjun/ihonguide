'use client';

/**
 * 블로그 카드 컴포넌트
 */

import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui';
import type { BlogPostSummary } from '@/types/blog';

interface BlogCardProps {
  post: BlogPostSummary;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
        {/* 썸네일 이미지 */}
        <div className="relative h-48 -mx-6 -mt-6 mb-4 bg-gray-100">
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          )}
        </div>

        {/* 카테고리 */}
        {post.category && (
          <span className="inline-block px-2 py-1 text-xs font-medium text-brand-primary bg-brand-primary/10 rounded mb-2">
            {post.category.name}
          </span>
        )}

        {/* 제목 */}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
          {post.title}
        </h3>

        {/* 요약 */}
        {post.excerpt && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {post.excerpt}
          </p>
        )}

        {/* 메타 정보 */}
        <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
          <span>
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString('ko-KR')
              : ''}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {post.viewCount.toLocaleString()}
          </span>
        </div>
      </Card>
    </Link>
  );
}
