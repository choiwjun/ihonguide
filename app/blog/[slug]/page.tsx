/**
 * 블로그 상세 페이지
 * SSG + ISR로 성능 최적화
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout';
import { BlogDetail } from '@/components/blog';
import { generateBlogMetadata } from '@/lib/metadata';
import { createClient } from '@/lib/supabase/server';
import type { BlogPost, BlogPostSummary } from '@/types/blog';

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

// ISR: 1시간마다 재생성
export const revalidate = 3600;

// SSG: 빌드 시 정적 페이지 생성
export async function generateStaticParams() {
  try {
    const supabase = await createClient();
    if (!supabase) return [];

    const { data: posts } = await (supabase as any)
      .from('blog_posts')
      .select('slug')
      .eq('status', 'published')
      .limit(100);

    return (posts || []).map((post: { slug: string }) => ({
      slug: post.slug,
    }));
  } catch {
    // 빌드 시 DB 연결 실패해도 빌드 진행
    return [];
  }
}

// 동적 메타데이터 생성
export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const supabase = await createClient();
    if (!supabase) {
      return { title: '블로그 | 아이혼가이드' };
    }

    const { data: post } = await (supabase as any)
      .from('blog_posts')
      .select('title, excerpt, meta_title, meta_description, published_at, category:blog_categories(name)')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (!post) {
      return { title: '게시물을 찾을 수 없습니다 | 아이혼가이드' };
    }

    return generateBlogMetadata({
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || '',
      slug,
      category: post.category?.name,
      publishedAt: post.published_at,
    });
  } catch {
    return { title: '블로그 | 아이혼가이드' };
  }
}

async function fetchBlogPost(slug: string): Promise<{ post: BlogPost | null; relatedPosts: BlogPostSummary[] }> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return { post: null, relatedPosts: [] };
    }

    // 게시물 조회
    const { data: post, error } = await (supabase as any)
      .from('blog_posts')
      .select(`
        id,
        slug,
        title,
        content,
        excerpt,
        meta_title,
        meta_description,
        view_count,
        published_at,
        created_at,
        updated_at,
        category:blog_categories(id, name, slug)
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !post) {
      return { post: null, relatedPosts: [] };
    }

    // 관련 게시물 조회
    const { data: relatedPosts } = await (supabase as any)
      .from('blog_posts')
      .select(`
        id,
        slug,
        title,
        excerpt,
        published_at,
        category:blog_categories(name)
      `)
      .eq('status', 'published')
      .neq('id', post.id)
      .limit(3);

    return {
      post: {
        id: post.id,
        slug: post.slug,
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        featuredImage: null,
        categoryId: post.category?.id || null,
        category: post.category,
        status: 'published' as const,
        seoMeta: {
          title: post.meta_title,
          description: post.meta_description,
        },
        viewCount: post.view_count,
        publishedAt: post.published_at,
        createdAt: post.created_at,
        updatedAt: post.updated_at,
      },
      relatedPosts: (relatedPosts || []).map((p: any) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        featuredImage: null,
        categoryId: null,
        category: p.category,
        viewCount: 0,
        publishedAt: p.published_at,
      })),
    };
  } catch {
    return { post: null, relatedPosts: [] };
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const { post, relatedPosts } = await fetchBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <Container size="md" className="py-8">
      <BlogDetail post={post} relatedPosts={relatedPosts} />
    </Container>
  );
}
