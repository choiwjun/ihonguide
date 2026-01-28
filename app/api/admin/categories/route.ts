/**
 * 관리자 카테고리 API
 * GET /api/admin/categories - 카테고리 목록 조회
 */

import { NextResponse } from 'next/server';
import { createApiClient } from '@/lib/supabase/api';

/**
 * GET /api/admin/categories - 카테고리 목록 조회
 */
export async function GET() {
  try {
    const supabase = createApiClient();

    if (!supabase) {
      // Supabase 미설정 시 기본 카테고리 반환
      return NextResponse.json({
        data: [
          { id: '', name: '미분류', slug: 'uncategorized' },
        ]
      });
    }

    const { data, error } = await supabase
      .from('blog_categories')
      .select('id, name, slug, description, sort_order')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Categories fetch error:', error);
      return NextResponse.json(
        { error: '카테고리 목록을 불러오는데 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data || [] });
  } catch (error) {
    console.error('Categories API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
