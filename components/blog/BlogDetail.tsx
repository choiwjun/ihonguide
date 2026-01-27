'use client';

/**
 * 블로그 상세 컴포넌트
 */

import Link from 'next/link';
import Image from 'next/image';
import { Card, Button } from '@/components/ui';
import { BlogCard } from './BlogCard';
import type { BlogPost, BlogPostSummary } from '@/types/blog';

interface BlogDetailProps {
  post: BlogPost;
  relatedPosts: BlogPostSummary[];
}

export function BlogDetail({ post, relatedPosts }: BlogDetailProps) {
  return (
    <div className="space-y-8">
      {/* 메인 콘텐츠 */}
      <article>
        {/* 헤더 */}
        <header className="mb-8">
          {/* 카테고리 */}
          {post.category && (
            <Link
              href={`/blog?category=${post.category.slug}`}
              className="inline-block px-3 py-1 text-sm font-medium text-brand-primary bg-brand-primary/10 rounded-full mb-4 hover:bg-brand-primary/20 transition-colors"
            >
              {post.category.name}
            </Link>
          )}

          {/* 제목 */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          {/* 메타 정보 */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {post.publishedAt && (
              <span>
                {new Date(post.publishedAt).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            )}
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              조회 {post.viewCount.toLocaleString()}
            </span>
          </div>
        </header>

        {/* 대표 이미지 */}
        {post.featuredImage && (
          <div className="relative aspect-video mb-8 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* 본문 */}
        <Card>
          <div
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </Card>
      </article>

      {/* 네비게이션 */}
      <div className="flex justify-between items-center py-6 border-t border-gray-200">
        <Link href="/blog">
          <Button variant="ghost">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            목록으로
          </Button>
        </Link>
      </div>

      {/* 관련 게시물 */}
      {relatedPosts.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6">관련 글</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <BlogCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <Card className="bg-gray-50 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          이혼 관련 상담이 필요하신가요?
        </h3>
        <p className="text-gray-600 mb-4">
          전문 상담사가 도움을 드립니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/diagnosis">
            <Button variant="secondary">이혼 유형 진단</Button>
          </Link>
          <Link href="/consultation">
            <Button>무료 상담 신청</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
