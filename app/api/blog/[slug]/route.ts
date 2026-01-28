/**
 * 블로그 상세 API
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { BlogPost, BlogPostSummary, BlogDetailResponse } from '@/types/blog';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

/**
 * GET /api/blog/[slug] - 블로그 게시물 상세 조회
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json(
        { error: '서버 설정 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // 게시물 조회
    const { data: postData, error: postError } = await supabase
      .from('blog_posts')
      .select(
        `
        id,
        slug,
        title,
        content,
        excerpt,
        featured_image,
        category_id,
        status,
        seo_meta,
        view_count,
        published_at,
        created_at,
        updated_at,
        blog_categories (
          id,
          name,
          slug,
          description,
          sort_order
        )
      `
      )
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (postError && postError.code !== 'PGRST116') {
      console.error('Blog detail error:', postError);
      return NextResponse.json(
        { error: '게시물을 불러오는데 실패했습니다.' },
        { status: 500 }
      );
    }

    if (!postData) {
      return NextResponse.json(
        { error: '게시물을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // Cast to any to avoid TypeScript issues with generated types
    const rawPost = postData as any;

    // 조회수 증가 (비동기로 처리, 에러 무시)
    (supabase as any)
      .from('blog_posts')
      .update({ view_count: (rawPost.view_count || 0) + 1 })
      .eq('id', rawPost.id)
      .then(() => {});

    // 관련 게시물 조회 (같은 카테고리, 현재 게시물 제외, 최대 3개)
    let relatedPosts: BlogPostSummary[] = [];
    if (rawPost.category_id) {
      const { data: relatedData } = await (supabase as any)
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
        `
        )
        .eq('status', 'published')
        .eq('category_id', rawPost.category_id)
        .neq('id', rawPost.id)
        .order('published_at', { ascending: false })
        .limit(3);

      relatedPosts = (relatedData || []).map((p: any) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        featuredImage: p.featured_image,
        categoryId: p.category_id,
        category: p.blog_categories
          ? {
              id: p.blog_categories.id,
              name: p.blog_categories.name,
              slug: p.blog_categories.slug,
              description: p.blog_categories.description,
              sortOrder: p.blog_categories.sort_order,
            }
          : null,
        viewCount: p.view_count,
        publishedAt: p.published_at,
      }));
    }

    // snake_case -> camelCase 변환
    const post: BlogPost = {
      id: rawPost.id,
      slug: rawPost.slug,
      title: rawPost.title,
      content: rawPost.content,
      excerpt: rawPost.excerpt,
      featuredImage: rawPost.featured_image,
      categoryId: rawPost.category_id,
      category: rawPost.blog_categories
        ? {
            id: rawPost.blog_categories.id,
            name: rawPost.blog_categories.name,
            slug: rawPost.blog_categories.slug,
            description: rawPost.blog_categories.description,
            sortOrder: rawPost.blog_categories.sort_order,
          }
        : null,
      status: rawPost.status,
      seoMeta: rawPost.seo_meta,
      viewCount: rawPost.view_count,
      publishedAt: rawPost.published_at,
      createdAt: rawPost.created_at,
      updatedAt: rawPost.updated_at,
    };

    const response: BlogDetailResponse = {
      post,
      relatedPosts,
    };

    return NextResponse.json({ data: response });
  } catch (error) {
    console.error('Blog detail API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
