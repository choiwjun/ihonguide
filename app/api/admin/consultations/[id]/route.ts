/**
 * 관리자 상담 API - 개별 상담 조회/수정
 * GET /api/admin/consultations/[id] - 상담 상세 조회
 * PATCH /api/admin/consultations/[id] - 상담 상태 수정
 */

import { NextRequest, NextResponse } from 'next/server';
import { createApiClient } from '@/lib/supabase/api';

/**
 * GET /api/admin/consultations/[id] - 상담 상세 조회
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

    const { data, error } = await supabase
      .from('consultations')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: '상담 정보를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: {
        id: data.id,
        ticketNumber: data.ticket_number,
        name: data.name,
        phone: data.phone,
        email: data.email,
        consultationType: data.consultation_type,
        preferredTime: data.preferred_time,
        status: data.status,
        currentSituation: data.current_situation,
        description: data.description,
        adminNotes: data.admin_notes,
        createdAt: data.created_at,
        contactedAt: data.contacted_at,
        completedAt: data.completed_at,
      }
    });
  } catch (error) {
    console.error('Admin consultation API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/consultations/[id] - 상담 상태/메모 수정
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

    const body = await request.json();

    // 업데이트 데이터 구성
    const updateData: Record<string, unknown> = {};

    if (body.status !== undefined) {
      updateData.status = body.status;

      // 상태에 따른 시간 기록
      if (body.status === 'contacted' || body.status === 'in_progress') {
        updateData.contacted_at = new Date().toISOString();
      }
      if (body.status === 'completed') {
        updateData.completed_at = new Date().toISOString();
      }
    }

    if (body.adminNotes !== undefined) {
      updateData.admin_notes = body.adminNotes;
    }

    const { data, error } = await supabase
      .from('consultations')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Consultation update error:', error);
      return NextResponse.json(
        { error: '상담 정보 수정에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Admin consultation API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
