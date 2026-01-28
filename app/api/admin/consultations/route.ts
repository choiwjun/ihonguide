/**
 * 관리자 상담 API
 * GET /api/admin/consultations - 상담 목록 조회
 */

import { NextRequest, NextResponse } from 'next/server';
import { createApiClient } from '@/lib/supabase/api';

/**
 * GET /api/admin/consultations - 상담 목록 조회
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const pageSize = Math.min(50, Math.max(1, parseInt(searchParams.get('pageSize') || '20')));

    const supabase = createApiClient();

    if (!supabase) {
      return NextResponse.json({
        data: {
          consultations: [],
          total: 0,
          page: 1,
          pageSize,
          totalPages: 0,
        }
      });
    }

    // 기본 쿼리
    let query = (supabase as any)
      .from('consultations')
      .select('*', { count: 'exact' });

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
      console.error('Admin consultations list error:', error);
      return NextResponse.json(
        { error: '상담 목록을 불러오는데 실패했습니다.' },
        { status: 500 }
      );
    }

    // 응답 변환 (snake_case -> camelCase)
    const consultations = (data || []).map((item: any) => ({
      id: item.id,
      ticketNumber: item.ticket_number,
      name: item.name,
      phone: item.phone,
      email: item.email,
      consultationType: item.consultation_type,
      preferredTime: item.preferred_time,
      status: item.status,
      currentSituation: item.current_situation,
      description: item.description,
      adminNotes: item.admin_notes,
      createdAt: item.created_at,
      contactedAt: item.contacted_at,
      completedAt: item.completed_at,
    }));

    const total = count || 0;
    const totalPages = Math.ceil(total / pageSize);

    return NextResponse.json({
      data: {
        consultations,
        total,
        page,
        pageSize,
        totalPages,
      }
    });
  } catch (error) {
    console.error('Admin consultations API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
