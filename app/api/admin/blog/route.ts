/**
 * 관리자 블로그 API - 게시물 생성
 * POST /api/admin/blog
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

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

export async function POST(request: NextRequest) {
  try {
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
      author_id: user.id,
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
