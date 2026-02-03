/**
 * 사이트맵 생성
 */

import { MetadataRoute } from 'next';
import { createApiClient } from '@/lib/supabase/api';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ihonjunbi.com';

/** 사이트맵용 블로그 포스트 최소 정보 */
interface SitemapBlogPost {
  slug: string;
  updatedAt: string | null;
  publishedAt: string | null;
}

/**
 * 블로그 포스트 목록 가져오기
 */
async function fetchBlogPosts(): Promise<SitemapBlogPost[]> {
  const supabase = createApiClient();

  // Supabase가 설정되지 않은 경우 빈 배열 반환
  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await (supabase as any)
      .from('blog_posts')
      .select('slug, updated_at, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Sitemap: Failed to fetch blog posts:', error);
      return [];
    }

    // snake_case -> camelCase 변환
    return ((data || []) as any[]).map((post) => ({
      slug: post.slug,
      updatedAt: post.updated_at,
      publishedAt: post.published_at,
    }));
  } catch (error) {
    console.error('Sitemap: Error fetching blog posts:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 정적 페이지들
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/diagnosis`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/calculator/property`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/consultation`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/guide`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // 블로그 포스트 동적 추가
  const posts = await fetchBlogPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(
      post.updatedAt ?? post.publishedAt ?? Date.now()
    ),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}

/**
 * 사이트맵 캐싱: 매일 재검증
 */
export const revalidate = 86400; // 24시간(초 단위)
