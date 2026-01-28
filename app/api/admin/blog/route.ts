/**
 * 관리자 블로그 API
 * GET /api/admin/blog - 게시물 목록 조회
 * POST /api/admin/blog - 게시물 생성
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';

interface CreateBlogPostRequest {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  categoryId?: string;
  metaTitle?: string;
  metaDescription?: string;
  status: 'draft' | 'published';
}

/**
 * GET /api/admin/blog - 관리자용 게시물 목록 조회 (모든 상태)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // 'all', 'draft', 'published'
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const pageSize = Math.min(50, Math.max(1, parseInt(searchParams.get('pageSize') || '20')));

    const supabase = createClient();

    // Supabase 미설정 시 빈 목록 반환
    if (!supabase) {
      return NextResponse.json({
        data: {
          posts: [],
          total: 0,
          page: 1,
          pageSize,
          totalPages: 0,
        }
      });
    }

    // 기본 쿼리
    let query = (supabase as any)
      .from('blog_posts')
      .select(`
        id,
        slug,
        title,
        excerpt,
        status,
        view_count,
        published_at,
        created_at,
        updated_at,
        category:blog_categories(id, name, slug)
      `, { count: 'exact' });

    // 상태 필터
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    // 정렬 및 페이지네이션
    const offset = (page - 1) * pageSize;
    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    if (error) {
      console.error('Admin blog list error:', error);
      return NextResponse.json(
        { error: '게시물 목록을 불러오는데 실패했습니다.' },
        { status: 500 }
      );
    }

    // 응답 변환
    const posts = (data || []).map((post: any) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      status: post.status,
      viewCount: post.view_count,
      publishedAt: post.published_at,
      createdAt: post.created_at,
      updatedAt: post.updated_at,
      category: post.category,
    }));

    const total = count || 0;
    const totalPages = Math.ceil(total / pageSize);

    return NextResponse.json({
      data: {
        posts,
        total,
        page,
        pageSize,
        totalPages,
      }
    });
  } catch (error) {
    console.error('Admin blog API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/blog - 게시물 생성
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();

    if (!supabase) {
      return NextResponse.json(
        { error: '서버 설정 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    const body: CreateBlogPostRequest = await request.json();

    // 필수 필드 검증
    if (!body.title?.trim()) {
      return NextResponse.json(
        { error: '제목은 필수입니다.' },
        { status: 400 }
      );
    }

    if (!body.content?.trim()) {
      return NextResponse.json(
        { error: '내용은 필수입니다.' },
        { status: 400 }
      );
    }

    // slug 생성/검증
    const slug = body.slug?.trim() || generateSlug(body.title);

    // slug 중복 확인
    const { data: existingPost } = await (supabase as any)
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existingPost) {
      return NextResponse.json(
        { error: '이미 사용 중인 URL입니다.' },
        { status: 400 }
      );
    }

    // 게시물 생성
    const postData = {
      title: body.title.trim(),
      slug,
      content: body.content.trim(),
      excerpt: body.excerpt?.trim() || null,
      category_id: body.categoryId || null,
      meta_title: body.metaTitle?.trim() || body.title.trim(),
      meta_description: body.metaDescription?.trim() || body.excerpt?.trim() || null,
      status: body.status,
      published_at: body.status === 'published' ? new Date().toISOString() : null,
    };

    const { data: newPost, error: insertError } = await (supabase as any)
      .from('blog_posts')
      .insert(postData)
      .select()
      .single();

    if (insertError) {
      console.error('Blog post creation error:', insertError);
      return NextResponse.json(
        { error: '게시물 생성에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      post: newPost,
    }, { status: 201 });

  } catch (error) {
    console.error('Admin blog API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s가-힣-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
