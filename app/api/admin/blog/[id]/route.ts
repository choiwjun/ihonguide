/**
 * 관리자 블로그 API - 게시물 수정/삭제
 * PUT /api/admin/blog/[id]
 * DELETE /api/admin/blog/[id]
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json(
        { error: '서버 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // 인증 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    // 관리자 권한 확인
    const userRole = user.user_metadata?.role || user.app_metadata?.role;
    if (userRole !== 'admin') {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json(
        { error: '서버 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // 인증 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    // 관리자 권한 확인
    const userRole = user.user_metadata?.role || user.app_metadata?.role;
    if (userRole !== 'admin') {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
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
