/**
 * 상담 신청 API
 * POST /api/consultation - 상담 신청 접수
 */

import { NextRequest, NextResponse } from 'next/server';
import { createApiClient } from '@/lib/supabase/api';
import type { ConsultationInput, ConsultationType } from '@/types/consultation';

interface ConsultationRequestBody extends Partial<ConsultationInput> {
  message?: string;
}

const VALID_CONSULTATION_TYPES: ConsultationType[] = ['이혼상담', '양육비상담', '재산분할상담', '기타'];

/**
 * 접수 번호 생성
 */
function generateTicketNumber(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `CST-${dateStr}-${random}`;
}

/**
 * 전화번호 형식 검증
 */
function isValidPhoneNumber(phone: string): boolean {
  // 숫자만 추출
  const digits = phone.replace(/\D/g, '');
  // 10자리 또는 11자리 숫자
  return digits.length >= 10 && digits.length <= 11;
}

/**
 * 이메일 형식 검증
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 입력값 검증
 */
function validateInput(body: ConsultationRequestBody): { valid: boolean; error?: string } {
  const { name, phone, email, consultationType, message, privacyConsent } = body;

  // 이름 필수
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return { valid: false, error: '이름을 입력해주세요.' };
  }

  if (name.trim().length < 2) {
    return { valid: false, error: '이름은 2자 이상 입력해주세요.' };
  }

  // 연락처 필수
  if (!phone || typeof phone !== 'string') {
    return { valid: false, error: '연락처를 입력해주세요.' };
  }

  if (!isValidPhoneNumber(phone)) {
    return { valid: false, error: '올바른 연락처 형식이 아닙니다.' };
  }

  // 이메일 (선택이지만 입력 시 형식 검증)
  if (email && !isValidEmail(email)) {
    return { valid: false, error: '올바른 이메일 형식이 아닙니다.' };
  }

  // 상담 유형 필수
  if (!consultationType) {
    return { valid: false, error: '상담 유형을 선택해주세요.' };
  }

  if (!VALID_CONSULTATION_TYPES.includes(consultationType as ConsultationType)) {
    return { valid: false, error: '유효하지 않은 상담 유형입니다.' };
  }

  // 상담 내용 필수
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return { valid: false, error: '상담 내용을 입력해주세요.' };
  }

  if (message.trim().length < 10) {
    return { valid: false, error: '상담 내용은 10자 이상 입력해주세요.' };
  }

  // 개인정보 동의 필수
  if (privacyConsent !== true) {
    return { valid: false, error: '개인정보 수집 및 이용에 동의해주세요.' };
  }

  return { valid: true };
}

/**
 * 상담 신청 저장
 */
async function saveConsultation(
  supabase: ReturnType<typeof createApiClient>,
  data: {
    name: string;
    phone: string;
    email?: string;
    consultationType: ConsultationType;
    description: string;
    ticketNumber: string;
  }
): Promise<{ id: string; ticketNumber: string } | null> {
  if (!supabase) return null;

  try {
    const { data: savedResult, error: saveError } = await supabase
      .from('consultations')
      .insert({
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        consultation_type: data.consultationType,
        description: data.description,
        ticket_number: data.ticketNumber,
        status: 'pending',
      })
      .select('id, ticket_number')
      .single();

    if (saveError) {
      console.error('Failed to save consultation:', saveError.message);
      return null;
    }

    return {
      id: savedResult?.id ?? '',
      ticketNumber: savedResult?.ticket_number ?? data.ticketNumber,
    };
  } catch (error) {
    console.error('Error saving consultation:', error);
    return null;
  }
}

/**
 * POST /api/consultation
 * 상담 신청 접수
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ConsultationRequestBody;

    // 입력값 검증
    const validation = validateInput(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Supabase 클라이언트 생성
    const supabase = createApiClient();

    // 접수 번호 생성
    const ticketNumber = generateTicketNumber();

    // 결과 저장
    const savedData = await saveConsultation(supabase, {
      name: body.name!.trim(),
      phone: body.phone!.replace(/\D/g, ''),
      email: body.email?.trim(),
      consultationType: body.consultationType as ConsultationType,
      description: body.message!.trim(),
      ticketNumber,
    });

    return NextResponse.json({
      success: true,
      data: {
        id: savedData?.id ?? null,
        ticketNumber: savedData?.ticketNumber ?? ticketNumber,
        status: 'pending',
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Consultation API error:', error);
    return NextResponse.json(
      { error: '상담 신청 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
