/**
 * 블로그 목록 API
 */

import { NextRequest, NextResponse } from 'next/server';
import { createApiClient } from '@/lib/supabase/api';
import type { BlogPostSummary, BlogListResponse } from '@/types/blog';

/**
 * GET /api/blog - 블로그 게시물 목록 조회
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const pageSize = Math.min(50, Math.max(1, parseInt(searchParams.get('pageSize') || '10')));
    const category = searchParams.get('category');

    const supabase = createApiClient();

    // Supabase가 설정되지 않은 경우 빈 목록 반환
    if (!supabase) {
      const emptyResponse: BlogListResponse = {
        posts: [],
        total: 0,
        page: 1,
        pageSize,
        totalPages: 0,
      };
      return NextResponse.json({ data: emptyResponse });
    }

    // 기본 쿼리 (use as any to avoid TypeScript issues with generated types)
    let query = (supabase as any)
      .from('blog_posts')
      .select(
        `
        id,
        slug,
        title,
        excerpt,
        featured_image,
        category_id,
        view_count,
        published_at,
        blog_categories (
          id,
          name,
          slug,
          description,
          sort_order
        )
      `,
        { count: 'exact' }
      )
      .eq('status', 'published');

    // 카테고리 필터
    if (category) {
      query = query.eq('blog_categories.slug', category);
    }

    // 정렬 및 페이지네이션
    const offset = (page - 1) * pageSize;
    const { data, error, count } = await query
      .order('published_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (error) {
      console.error('Blog list error:', error);
      return NextResponse.json(
        { error: '블로그 목록을 불러오는데 실패했습니다.' },
        { status: 500 }
      );
    }

    // snake_case -> camelCase 변환
    const posts: BlogPostSummary[] = ((data || []) as any[]).map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      featuredImage: post.featured_image,
      categoryId: post.category_id,
      category: post.blog_categories
        ? {
            id: post.blog_categories.id,
            name: post.blog_categories.name,
            slug: post.blog_categories.slug,
            description: post.blog_categories.description,
            sortOrder: post.blog_categories.sort_order,
          }
        : null,
      viewCount: post.view_count,
      publishedAt: post.published_at,
    }));

    const total = count || 0;
    const totalPages = Math.ceil(total / pageSize);

    const response: BlogListResponse = {
      posts,
      total,
      page,
      pageSize,
      totalPages,
    };

    return NextResponse.json({ data: response });
  } catch (error) {
    console.error('Blog API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
