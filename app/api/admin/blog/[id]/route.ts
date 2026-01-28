/**
 * 관리자 블로그 API - 게시물 조회/수정/삭제
 * GET /api/admin/blog/[id] - 단일 게시물 조회
 * PATCH /api/admin/blog/[id] - 게시물 수정
 * DELETE /api/admin/blog/[id] - 게시물 삭제
 */

import { NextRequest, NextResponse } from 'next/server';
import { createApiClient } from '@/lib/supabase/api';

interface UpdateBlogPostRequest {
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  categoryId?: string;
  metaTitle?: string;
  metaDescription?: string;
  status?: 'draft' | 'published';
}

/**
 * GET /api/admin/blog/[id] - 단일 게시물 조회
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createApiClient();

    if (!supabase) {
      return NextResponse.json(
        { error: '서버 설정 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    const { data: post, error } = await (supabase as any)
      .from('blog_posts')
      .select(`
        id,
        slug,
        title,
        content,
        excerpt,
        status,
        view_count,
        meta_title,
        meta_description,
        published_at,
        created_at,
        updated_at,
        category:blog_categories(id, name, slug)
      `)
      .eq('id', id)
      .single();

    if (error || !post) {
      return NextResponse.json(
        { error: '게시물을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: {
        id: post.id,
        slug: post.slug,
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        status: post.status,
        viewCount: post.view_count,
        metaTitle: post.meta_title,
        metaDescription: post.meta_description,
        publishedAt: post.published_at,
        createdAt: post.created_at,
        updatedAt: post.updated_at,
        category: post.category,
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
 * PATCH /api/admin/blog/[id] - 게시물 수정
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createApiClient();

    if (!supabase) {
      return NextResponse.json(
        { error: '서버 설정 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // 기존 게시물 확인
    const { data: existingPost, error: fetchError } = await (supabase as any)
      .from('blog_posts')
      .select('id, status, published_at')
      .eq('id', id)
      .single();

    if (fetchError || !existingPost) {
      return NextResponse.json(
        { error: '게시물을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    const body: UpdateBlogPostRequest = await request.json();

    // slug 중복 확인 (변경된 경우)
    if (body.slug) {
      const { data: duplicatePost } = await (supabase as any)
        .from('blog_posts')
        .select('id')
        .eq('slug', body.slug)
        .neq('id', id)
        .single();

      if (duplicatePost) {
        return NextResponse.json(
          { error: '이미 사용 중인 URL입니다.' },
          { status: 400 }
        );
      }
    }

    // 업데이트 데이터 구성
    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (body.title !== undefined) updateData.title = body.title.trim();
    if (body.slug !== undefined) updateData.slug = body.slug.trim();
    if (body.content !== undefined) updateData.content = body.content.trim();
    if (body.excerpt !== undefined) updateData.excerpt = body.excerpt?.trim() || null;
    if (body.categoryId !== undefined) updateData.category_id = body.categoryId || null;
    if (body.metaTitle !== undefined) updateData.meta_title = body.metaTitle?.trim() || null;
    if (body.metaDescription !== undefined) updateData.meta_description = body.metaDescription?.trim() || null;

    // 상태 변경 처리
    if (body.status !== undefined) {
      updateData.status = body.status;

      // 처음 발행하는 경우 published_at 설정
      if (body.status === 'published' && !existingPost.published_at) {
        updateData.published_at = new Date().toISOString();
      }
    }

    // 게시물 업데이트
    const { data: updatedPost, error: updateError } = await (supabase as any)
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Blog post update error:', updateError);
      return NextResponse.json(
        { error: '게시물 수정에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      post: updatedPost,
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
 * DELETE /api/admin/blog/[id] - 게시물 삭제
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createApiClient();

    if (!supabase) {
      return NextResponse.json(
        { error: '서버 설정 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // 게시물 존재 확인
    const { data: existingPost } = await (supabase as any)
      .from('blog_posts')
      .select('id')
      .eq('id', id)
      .single();

    if (!existingPost) {
      return NextResponse.json(
        { error: '게시물을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 게시물 삭제
    const { error: deleteError } = await (supabase as any)
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Blog post delete error:', deleteError);
      return NextResponse.json(
        { error: '게시물 삭제에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error('Admin blog API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
